import re

with open(r'd:\remix_-gens-noah-ai\src\pages\Home.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add AnimatePresence wrapper
content = content.replace(
    "            {pricingTab === 'edu' && (",
    "            <AnimatePresence mode=\"wait\">\n              {pricingTab === 'edu' && ("
)

content = content.replace(
    "              </div>\n            )}\n\n            {/* Limited Offer Banner",
    "              </motion.div>\n            )}\n            </AnimatePresence>\n\n            {/* Limited Offer Banner"
)

# Convert tab divs to motion.divs
tabs = ['edu', 'startup', 'clinic', 'business']
for tab in tabs:
    # Find the opening div for each grid
    pattern = r"\{pricingTab === '" + tab + r"' && \(\s+<div className=\"(grid [^\"]+)\">"
    replacement = r"{pricingTab === '" + tab + r"' && (\n                <motion.div\n                  key=\"" + tab + r"\"\n                  initial={{ opacity: 0, y: 20 }}\n                  animate={{ opacity: 1, y: 0 }}\n                  exit={{ opacity: 0, y: -20 }}\n                  transition={{ duration: 0.3, ease: 'easeOut' }}\n                  className=\"\1 items-stretch\"\n                >"
    content = re.sub(pattern, replacement, content)

# Change closing div to motion.div for the 3 intermediate ones
content = content.replace(
    "              </div>\n            )}\n\n            {pricingTab === 'startup' && (",
    "              </motion.div>\n            )}\n\n            {pricingTab === 'startup' && ("
)
content = content.replace(
    "              </div>\n            )}\n\n            {pricingTab === 'clinic' && (",
    "              </motion.div>\n            )}\n\n            {pricingTab === 'clinic' && ("
)
content = content.replace(
    "              </div>\n            )}\n\n            {pricingTab === 'business' && (",
    "              </motion.div>\n            )}\n\n            {pricingTab === 'business' && ("
)

# Fix price-card to have h-full
content = content.replace(
    "className={`price-card ${plan.popular ?",
    "className={`price-card h-full ${plan.popular ?"
)

with open(r'd:\remix_-gens-noah-ai\src\pages\Home.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated Home.tsx successfully!")
