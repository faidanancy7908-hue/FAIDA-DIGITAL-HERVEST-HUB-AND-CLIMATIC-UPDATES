import sys

with open('src/old_App.jsx', 'r', encoding='utf-8') as f:
    old_lines = f.readlines()

# Find the start and end of main block in old_App.jsx
start_main = -1
end_main = -1
for i, line in enumerate(old_lines):
    if '<main className="flex-1 space-y-12 w-full">' in line:
        start_main = i - 1  # Include the comment
    if '</main>' in line and start_main != -1:
        end_main = i
        break

if start_main == -1 or end_main == -1:
    print("Could not find main block in old_App.jsx")
    sys.exit(1)

main_block = old_lines[start_main:end_main+1]
main_block = ['          {activeRole !== \'General\' && (\n'] + main_block + ['          )}\n']

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    new_lines = f.readlines()

# Find where to inject it in App.jsx
# It should be after the           </aside> and           )} block.
insert_idx = -1
for i, line in enumerate(new_lines):
    if '          </aside>' in line:
        if new_lines[i+1].strip() == ')}':
            insert_idx = i + 2
        break

if insert_idx == -1:
    print("Could not find injection point in App.jsx")
    sys.exit(1)

final_lines = new_lines[:insert_idx] + main_block + new_lines[insert_idx:]

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.writelines(final_lines)

print("Main block successfully injected.")
