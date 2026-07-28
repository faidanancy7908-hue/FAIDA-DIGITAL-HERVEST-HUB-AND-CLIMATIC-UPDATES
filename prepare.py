import sys

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

import_str = "  ChevronDown\n} from 'lucide-react';"
if 'ChevronDown' not in content[:1000]:
    content = content.replace("} from 'lucide-react';", import_str)

state_str = """
  const [expandedSections, setExpandedSections] = useState({
    weather: false,
    interventions: false,
    actions: false,
    planning: false,
    guidelines: false,
    resource: false,
    tools: false,
    applications: false
  });
  const toggleSection = (section) => setExpandedSections(p => ({...p, [section]: !p[section]}));
"""
if 'expandedSections' not in content:
    content = content.replace("const [activeRole, setActiveRole] = useState('General');", "const [activeRole, setActiveRole] = useState('General');\n" + state_str)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Prepared state.")
