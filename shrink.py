import sys

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# We want to replace specific paddings inside the Farmer portal.
# Let's replace 'glass-panel p-8' with 'glass-panel p-5' for the relevant sections.
# And space-y-8 with space-y-5
# The Farmer section starts with id="weather-section" and ends at the end of the Farmer block.
start_str = '          {(activeRole === \'Farmer\') && ('
end_str = '          {(activeRole === \'NGO\' || activeRole === \'Ministry\') && ('

start_idx = content.find(start_str)
end_idx = content.find(end_str)

if start_idx != -1 and end_idx != -1:
    farmer_block = content[start_idx:end_idx]
    
    # Replace padding
    farmer_block = farmer_block.replace('glass-panel p-8', 'glass-panel p-5')
    farmer_block = farmer_block.replace('space-y-8', 'space-y-4')
    farmer_block = farmer_block.replace('p-6 bg-slate-900/50', 'p-4 bg-slate-900/50')
    
    new_content = content[:start_idx] + farmer_block + content[end_idx:]
    
    with open('src/App.jsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Farmer portal containers resized.")
else:
    print("Could not find blocks.")
