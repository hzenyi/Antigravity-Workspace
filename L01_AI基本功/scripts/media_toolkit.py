"""
Media Toolkit for L01_AI基本功
功能：
1. 自動下載 YouTube 1080P 高畫質影片
2. 擷取繁體中文字幕並轉換為 Windows 相容之 UTF-8 with BOM (.srt)
3. 使用 FFmpeg 無損封裝預設繁體中文字幕軌至 MP4 檔案中
"""

import subprocess
import os
import re
import glob

YTDLP = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Links\yt-dlp.exe"
FFMPEG = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\yt-dlp.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-N-125875-g5d4d3bdc61-win64-gpl\bin\ffmpeg.exe"

def download_1080p(url, output_dir, filename_template="%(title)s [%(id)s].%(ext)s"):
    os.makedirs(output_dir, exist_ok=True)
    cmd = [
        YTDLP,
        "--no-playlist",
        "-f", "bv*[height=1080]+ba/b[height<=1080]/best",
        "--merge-output-format", "mp4",
        "-P", output_dir,
        "-o", filename_template,
        url
    ]
    subprocess.run(cmd, check=True)

def embed_subtitle_to_mp4(mp4_path, srt_path):
    if not os.path.exists(mp4_path) or not os.path.exists(srt_path):
        print("File missing for embedding.")
        return False
    
    dirname = os.path.dirname(mp4_path)
    basename = os.path.basename(mp4_path)
    temp_clean = os.path.join(dirname, "temp_clean_" + basename)
    temp_mux = os.path.join(dirname, "temp_mux_" + basename)
    
    # 1. 剝離舊字幕
    subprocess.run([FFMPEG, "-y", "-i", mp4_path, "-map", "0:v", "-map", "0:a", "-c", "copy", temp_clean], capture_output=True)
    # 2. 封裝新字幕
    cmd = [
        FFMPEG, "-y",
        "-i", temp_clean,
        "-i", srt_path,
        "-c", "copy",
        "-c:s", "mov_text",
        "-metadata:s:s:0", "language=chi",
        "-metadata:s:s:0", "title=繁體中文",
        "-disposition:s:0", "default",
        temp_mux
    ]
    res = subprocess.run(cmd, capture_output=True)
    if res.returncode == 0 and os.path.exists(temp_mux):
        os.remove(mp4_path)
        os.remove(temp_clean)
        os.rename(temp_mux, mp4_path)
        print(f"Successfully embedded subtitle into: {basename}")
        return True
    else:
        if os.path.exists(temp_clean):
            os.remove(temp_clean)
        return False

if __name__ == "__main__":
    print("Media Toolkit is ready.")
