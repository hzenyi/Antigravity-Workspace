import json
import sys

def main():
    sys.stdout.reconfigure(encoding='utf-8')
    with open('downloads/sub_items.json', 'r', encoding='utf-8') as f:
        items = json.load(f)
    
    start = int(sys.argv[1]) if len(sys.argv) > 1 else 0
    end = int(sys.argv[2]) if len(sys.argv) > 2 else len(items)
    
    for item in items[start:end]:
        print(f"{item['index']}\t{item['timing']}\t{item['text']}")

if __name__ == '__main__':
    main()
