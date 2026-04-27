# import pandas as pd
# import numpy as np

# # Load Data
# df = pd.read_csv('Global_Superstore2.csv', encoding = 'latin1')
# print(f"Original shape: {df.shape}")

# # Fix 1 -- Drop Useless Columns
# df.drop(columns=['Postal Code', 'Row ID'], inplace = True)

# # Fix 2 -- Convert dates (DD-MM YYYY format)
# # df['Order Data'] = pd.to_datetime(df['Order Date'], dayfirst = True)
# # df['Ship Data'] = pd.to_datetime(df['Ship Date'], dayfirst = True)
# df['Order Date'] = pd.to_datetime(df['Order Date'], dayfirst=True)
# df['Ship Date']  = pd.to_datetime(df['Ship Date'],  dayfirst=True)


# # Fix 3 -- Extract Year, Month, Quarter from Order Date
# df['Order Year'] = df['Order Date'].dt.year
# df['Order Month'] = df['Order Date'].dt.month
# df['Order Month Name'] = df['Order Date'].dt.strftime('%B') #January, February .........
# df['Order Quarter'] = df['Order Date'].dt.quarter
# df['Order Quarter Name'] = 'Q' + df['Order Date'].dt.quarter.astype(str)

# # Fix 4
# df['Profile Margin %'] = (df['Profit'] /df['Sales'] * 100).round(2)

# # Fix 5
# def discount_band(d):
#     if d == 0:          return 'NO Discount'
#     elif d<= 0.20:      return 'Low (1-20%)'
#     elif d <= 0.40:     return 'High (21-40%)'
#     else:               return 'High (41-85%)'

# df['Discount Band'] = df['Discount'].apply(discount_band)

# # Fix 6 -- Add Delivery Days column

# df['Delivery Days'] = df['SHip Date'] - df['Order Date'].dt.days

# df['Is Loss'] = df['Profit'] < 0

# # Check final Shape
# print(f"Cleaned shape : (df.shpae)")
# print(f"\nNew Columns added: {['Order Year','Order Month','Order Month Name','Order Quarter', 'Profit Margin % Discount Band', 'Delivery Days','Is Loss']}")
# print(f"\nNulls remaining:\n{df.isnull().sum()[df.isnull().sum() > 0]}")
# print(df)
import pandas as pd
import numpy as np

# ── LOAD ──────────────────────────────────────────────
df = pd.read_csv('Global_Superstore2.csv', encoding='latin1')
print(f"Original shape: {df.shape}")

# ── FIX 1 — Drop useless columns ──────────────────────
df.drop(columns=['Postal Code', 'Row ID'], inplace=True)

# ── FIX 2 — Convert Dates (THIS IS THE CORRECTED LINE) ─
df['Order Date'] = pd.to_datetime(df['Order Date'], format='mixed', dayfirst=True)
df['Ship Date']  = pd.to_datetime(df['Ship Date'],  format='mixed', dayfirst=True)

# ── FIX 3 — Extract Year / Month / Quarter ─────────────
df['Order Year']       = df['Order Date'].dt.year
df['Order Month']      = df['Order Date'].dt.month
df['Order Month Name'] = df['Order Date'].dt.strftime('%B')
df['Order Quarter']    = 'Q' + df['Order Date'].dt.quarter.astype(str)

# ── FIX 4 — Add Profit Margin % ───────────────────────
df['Profit Margin %'] = (df['Profit'] / df['Sales'] * 100).round(2)

# ── FIX 5 — Add Discount Band ─────────────────────────
def discount_band(d):
    if d == 0:       return 'No Discount'
    elif d <= 0.20:  return 'Low (1-20%)'
    elif d <= 0.40:  return 'Medium (21-40%)'
    else:            return 'High (41-85%)'

df['Discount Band'] = df['Discount'].apply(discount_band)

# ── FIX 6 — Add Delivery Days ─────────────────────────
df['Delivery Days'] = (df['Ship Date'] - df['Order Date']).dt.days

# ── FIX 7 — Flag Loss-making orders ───────────────────
df['Is Loss'] = df['Profit'] < 0

# ── VERIFY ────────────────────────────────────────────
print(f"Cleaned shape: {df.shape}")
print(f"\nOrder Date dtype : {df['Order Date'].dtype}")
print(f"Ship Date dtype  : {df['Ship Date'].dtype}")
print(f"Nulls remaining  : {df.isnull().sum().sum()}")
print(f"\nSample cleaned dates:")
print(df['Order Date'].head(5).tolist())

# ── SAVE ──────────────────────────────────────────────
df.to_csv('Global_Superstore_CLEANED.csv', index=False)
print("\nDone! Saved as Global_Superstore_CLEANED.csv")