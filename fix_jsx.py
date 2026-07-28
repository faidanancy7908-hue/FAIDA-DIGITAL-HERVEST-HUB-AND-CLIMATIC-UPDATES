import sys

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

bad_str = "          {activeRole !== 'General' && (\n          {/* Main Content Area */}"
good_str = "          {/* Main Content Area */}\n          {activeRole !== 'General' && ("
if bad_str in content:
    content = content.replace(bad_str, good_str)
else:
    print("bad_str not found")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed JSX.")
