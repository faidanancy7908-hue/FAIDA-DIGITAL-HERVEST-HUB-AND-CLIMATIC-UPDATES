import sys

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 1. Update NGO Reject button
reject_btn_added = False
for i, line in enumerate(lines):
    if "Approve" in line and "setApplications(applications.map(" in lines[i-1]:
        # found the approve button
        start_idx = i - 2
        # we will replace the block
        lines[start_idx] = "                        {app.status === 'Pending' && (\n"
        lines[start_idx+1] = "                          <div className=\"flex w-full gap-2\">\n"
        lines[start_idx+2] = "                            <button onClick={() => {\n"
        lines[start_idx+3] = "                              setApplications(applications.map(a => a.id === app.id ? {...a, status: 'Approved', yield: '1.2t/ha (Est)'} : a));\n"
        lines[start_idx+4] = "                            }} className=\"flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs transition-all uppercase tracking-wider shadow-md shadow-emerald-600/20 active:scale-95\">\n"
        lines[start_idx+5] = "                              Approve\n"
        lines[start_idx+6] = "                            </button>\n"
        lines[start_idx+7] = "                            <button onClick={() => {\n"
        lines[start_idx+8] = "                              setApplications(applications.map(a => a.id === app.id ? {...a, status: 'Rejected'} : a));\n"
        lines[start_idx+9] = "                            }} className=\"flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 rounded-xl text-xs transition-all uppercase tracking-wider shadow-md shadow-red-600/20 active:scale-95\">\n"
        lines[start_idx+10] = "                              Reject\n"
        lines.insert(start_idx+11, "                            </button>\n")
        lines.insert(start_idx+12, "                          </div>\n")
        lines.insert(start_idx+13, "                        )}\n")
        
        # now remove the old extra lines up to the original closing )}
        # since we overwrote start_idx+1 to start_idx+10, but the original was start_idx+0 to start_idx+6.
        # Wait, using insert messes up the loop index. I should just use string replacement.
        break

