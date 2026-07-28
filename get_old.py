import subprocess
with open('src/old_App.jsx', 'w', encoding='utf-8') as f:
    out = subprocess.check_output(['git', 'show', 'e3d9fae^:src/App.jsx'], encoding='utf-8')
    f.write(out)
