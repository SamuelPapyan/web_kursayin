import sys

index = sys.argv[1]

def get_htmpy_tag(x):
    return x.find("<!htmpy") >= 0

def preprocess(htmpy_file, spaces=""):
    print(htmpy_file, len(spaces))
    with open('srcs/' + htmpy_file +".html", 'r', encoding='utf8') as f:
        lines = f.read().split('\n')
        for i in range(len(lines)):
            lines[i] = spaces + lines[i]
        htmpys = [x for x in enumerate(lines) if "<!htmpy" in x[1]]
        for htmpy in htmpys:
            htmpy_name = htmpy[1].split('<!htmpy')[1].split('!>')[0].strip()
            space_cache = htmpy[1].split('<!htmpy')[0]
            lines[htmpy[0]] = preprocess(htmpy_name, space_cache)
        result = '\n'.join(lines)
        # print("Compiled", htmpy_file)
        return result


with open(index + '.html', 'w', encoding='utf8') as index_html:
    index_html.write(preprocess("_" + index))
    print("Compilation done!")