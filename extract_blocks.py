import sys

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

def print_block(search_str, lines_before, lines_after):
    for i, line in enumerate(lines):
        if search_str in line:
            print(f'-- BLOCK FOR {search_str.strip()} --')
            print(''.join(lines[i-lines_before:i+lines_after]))
            print('-'*40)
            break

print_block('Real-Time IoT Soil Diagnostics', 2, 2)
print_block('Precision Farming Interventions', 2, 2)
print_block('Action Items', 2, 2)
print_block('Smart Planning Tool', 2, 2)
print_block('Best Practices Guidelines', 2, 2)
print_block('Resource Center', 2, 2)
print_block('My Applications & Feedback', 2, 2)

