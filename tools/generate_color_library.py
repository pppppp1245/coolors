# Color library generator per user spec
# Generates palettes for tabs with strict HSL rules and outputs HEX lists.
from math import floor

def hsl_to_hex(h, s, l):
    # h: 0-360, s,l: 0-100
    h = h % 360
    s = max(0, min(100, s)) / 100.0
    l = max(0, min(100, l)) / 100.0
    c = (1 - abs(2 * l - 1)) * s
    x = c * (1 - abs((h / 60.0) % 2 - 1))
    m = l - c/2
    r=g=b=0
    if 0 <= h < 60:
        r,g,b = c,x,0
    elif 60 <= h < 120:
        r,g,b = x,c,0
    elif 120 <= h < 180:
        r,g,b = 0,c,x
    elif 180 <= h < 240:
        r,g,b = 0,x,c
    elif 240 <= h < 300:
        r,g,b = x,0,c
    else:
        r,g,b = c,0,x
    R = int(round((r+m)*255))
    G = int(round((g+m)*255))
    B = int(round((b+m)*255))
    return '#{0:02x}{1:02x}{2:02x}'.format(R,G,B).upper()

# Helpers
s_steps = [20,40,60,80,100]
l_steps = [10,20,30,40,50,60,70,80,90,95]

# Tabs and hue ranges
tabs = {
    'Red': {'hmin':0,'hmax':10},
    'Orange': {'hmin':20,'hmax':35},
    'Yellow': {'hmin':45,'hmax':60},
    'Green': {'hmin':100,'hmax':140},
    'Blue': {'hmin':200,'hmax':220},
    'Purple': {'hmin':260,'hmax':280},
    'Pink': {'hmin':300,'hmax':340},
    'Mint': {'hmin':150,'hmax':170},
    'SkyBlue': {'hmin':180,'hmax':200},
    'Beige': {'hmin':30,'hmax':50},
    'Brown': {'hmin':10,'hmax':30},
    'Neon': {'hmin':0,'hmax':359},
    'Black': {},
    'White': {},
    'Gray': {}
}

# Filtering rules (functions)
def is_gray(s,l):
    return s <= 10 and 20 <= l <= 90

def is_black(l):
    return l <= 20

def is_white(s,l):
    return l >= 92 and s <= 10

def in_hue_range(h, hmin, hmax):
    # handle wrap-around if needed
    if hmin <= hmax:
        return hmin <= h <= hmax
    else:
        return h >= hmin or h <= hmax

# We'll build assignment dict
assigned = {k: [] for k in tabs.keys()}
used_hex = set()

# For color tabs (excluding Black/White/Gray/Neon which are special), generate by using multiple hue samples inside range
color_tabs = [t for t in tabs.keys() if t not in ('Black','White','Gray','Neon')]

# Generate candidates for each color tab until 50 unique hex not captured by filters
for t in color_tabs:
    cfg = tabs[t]
    hmin = cfg['hmin']
    hmax = cfg['hmax']
    # sample 8 hues evenly within range (inclusive)
    rng = hmax - hmin if hmax>=hmin else (hmax+360 - hmin)
    samples = []
    if rng == 0:
        samples = [hmin]
    else:
        for i in range(8):
            samples.append((hmin + (i/(7))*rng) % 360)
    i = 0
    # iterate through hue samples and s/l grid to collect until 50
    si = 0
    li = 0
    while len(assigned[t]) < 50 and i < 10000:
        h = samples[(i//(len(s_steps)*len(l_steps))) % len(samples)]
        s = s_steps[(i//len(l_steps)) % len(s_steps)]
        l = l_steps[i % len(l_steps)]
        i += 1
        # apply special rules
        # 1) Gray rule
        if is_gray(s,l):
            # move to Gray later, skip here
            continue
        # 2) black/white
        if is_black(l):
            continue
        if is_white(s,l):
            continue
        # 3) Pink in Red — if t is Red and hue falls into Pink range, skip
        if t == 'Red' and in_hue_range(h, tabs['Pink']['hmin'], tabs['Pink']['hmax']):
            continue
        # ensure hue is inside range
        if not in_hue_range(h, hmin, hmax):
            continue
        hx = hsl_to_hex(h,s,l)
        if hx in used_hex:
            continue
        used_hex.add(hx)
        assigned[t].append(hx)
    # if not enough, expand by jittering hues
    jitter = 1
    while len(assigned[t]) < 50:
        for s in s_steps:
            for l in l_steps:
                h = ( (hmin + hmax)/2 + jitter ) % 360
                jitter += 3
                if is_gray(s,l) or is_black(l) or is_white(s,l):
                    continue
                if t == 'Red' and in_hue_range(h, tabs['Pink']['hmin'], tabs['Pink']['hmax']):
                    continue
                if not in_hue_range(h, hmin, hmax):
                    continue
                hx = hsl_to_hex(h,s,l)
                if hx in used_hex:
                    continue
                used_hex.add(hx)
                assigned[t].append(hx)
                if len(assigned[t]) >= 50:
                    break
            if len(assigned[t]) >= 50:
                break

# Neon: generate highly saturated, mid-lightness colors across hues
neon_list = []
for h in range(0,360,5):
    for s in [90,95,100]:
        for l in [50,55,60,65]:
            if is_black(l) or is_white(s,l) or is_gray(s,l):
                continue
            hx = hsl_to_hex(h,s,l)
            if hx in used_hex:
                continue
            used_hex.add(hx)
            neon_list.append(hx)
            if len(neon_list) >= 50:
                break
        if len(neon_list) >= 50:
            break
    if len(neon_list) >= 50:
        break
assigned['Neon'] = neon_list[:50]

# Black: generate low lightness variants across hues and saturations
black_list = []
for h in range(0,360,7):
    for s in [0,20,40,60,80,100]:
        for l in [2,4,6,8,10,12,14,16,18,20]:
            hx = hsl_to_hex(h,s,l)
            if hx in used_hex:
                continue
            used_hex.add(hx)
            black_list.append(hx)
            if len(black_list) >= 50:
                break
        if len(black_list) >= 50:
            break
    if len(black_list) >= 50:
        break
assigned['Black'] = black_list[:50]

# White: high lightness, low saturation
white_list = []
for h in range(0,360,11):
    for s in [0,5,8,10]:
        for l in [92,93,94,95,96,97,98,99,100]:
            if l >= 92 and s <= 10:
                hx = hsl_to_hex(h,s,l)
                if hx in used_hex:
                    continue
                used_hex.add(hx)
                white_list.append(hx)
                if len(white_list) >= 50:
                    break
        if len(white_list) >= 50:
            break
    if len(white_list) >= 50:
        break
assigned['White'] = white_list[:50]

# Gray: desaturated mid range
gray_list = []
for h in range(0,360,20):
    for s in [0,2,5,7,10]:
        for l in [20,25,30,35,40,45,50,55,60,65,70,75,80,85,90]:
            if s <= 10 and 20 <= l <= 90:
                hx = hsl_to_hex(h,s,l)
                if hx in used_hex:
                    continue
                used_hex.add(hx)
                gray_list.append(hx)
                if len(gray_list) >= 50:
                    break
        if len(gray_list) >= 50:
            break
    if len(gray_list) >= 50:
        break
assigned['Gray'] = gray_list[:50]

# Mint, SkyBlue, Beige, Brown special generation
specials = ['Mint','SkyBlue','Beige','Brown']
for t in specials:
    lst = []
    cfg = tabs[t]
    hmin = cfg['hmin']
    hmax = cfg['hmax']
    # sample hues
    rng = hmax - hmin if hmax>=hmin else (hmax+360 - hmin)
    samples = [ (hmin + (i/9)*rng) % 360 for i in range(10) ]
    for h in samples:
        for s in [40,50,60,70,80,90][:6]:
            for l in [60,65,70,75,80,85,90,95][:8]:
                if t == 'Mint':
                    if not (150 <= h <= 170):
                        continue
                    if s < 40 or l < 60:
                        continue
                if t == 'SkyBlue':
                    if not (180 <= h <= 200):
                        continue
                    if l < 65:
                        continue
                if t == 'Beige':
                    if not (30 <= h <= 50):
                        continue
                    if s > 40 or l < 75:
                        continue
                if t == 'Brown':
                    if not (10 <= h <= 30):
                        continue
                    if l > 40:
                        continue
                hx = hsl_to_hex(h,s,l)
                if hx in used_hex:
                    continue
                used_hex.add(hx)
                lst.append(hx)
                if len(lst) >= 50:
                    break
            if len(lst) >= 50:
                break
        if len(lst) >= 50:
            break
    # if not enough, fill by varying parameters within constraints
    j=0
    while len(lst) < 50:
        h = ( (hmin + hmax)/2 + j*3 ) % 360
        for s in [40,50,60,70,80,90]:
            for l in [60,65,70,75,80,85,90,95]:
                if t == 'Mint' and (s < 40 or l < 60):
                    continue
                if t == 'SkyBlue' and l < 65:
                    continue
                if t == 'Beige' and (s > 40 or l < 75):
                    continue
                if t == 'Brown' and l > 40:
                    continue
                hx = hsl_to_hex(h,s,l)
                if hx in used_hex:
                    continue
                used_hex.add(hx)
                lst.append(hx)
                if len(lst) >= 50:
                    break
            if len(lst) >= 50:
                break
        j += 1
    assigned[t] = lst[:50]

# Finally ensure Pink is fully separate from Red: Pink must have hue 300-340, Red 0-10
# Generate Pink list explicitly
pink_list = []
for h in range(300,341,2):
    for s in [20,40,60,80,100]:
        for l in [10,20,30,40,50,60,70,80,90,95]:
            if is_gray(s,l) or is_black(l) or is_white(s,l):
                continue
            hx = hsl_to_hex(h,s,l)
            if hx in used_hex:
                continue
            used_hex.add(hx)
            pink_list.append(hx)
            if len(pink_list) >= 50:
                break
        if len(pink_list) >= 50:
            break
    if len(pink_list) >= 50:
        break
assigned['Pink'] = pink_list[:50]

# Ensure Red has 50: generate within 0-10 but exclude 300-340
red_list = []
for h in range(0,11):
    for s in [20,40,60,80,100]:
        for l in [10,20,30,40,50,60,70,80,90,95]:
            if is_gray(s,l) or is_black(l) or is_white(s,l):
                continue
            # if this hue in pink range, skip (not applicable here)
            hx = hsl_to_hex(h,s,l)
            if hx in used_hex:
                continue
            used_hex.add(hx)
            red_list.append(hx)
            if len(red_list) >= 50:
                break
        if len(red_list) >= 50:
            break
    if len(red_list) >= 50:
        break
assigned['Red'] = red_list[:50]

# For Orange/Yellow/Green/Blue/Purple ensure lists exist (some were prepopulated earlier)
for t in ['Orange','Yellow','Green','Blue','Purple']:
    if len(assigned[t]) < 50:
        lst = assigned[t]
        cfg = tabs[t]
        hmin = cfg['hmin']; hmax = cfg['hmax']
        j=0
        while len(lst) < 50:
            h = (hmin + (j % 10) * ((hmax-hmin)/9 if (hmax-hmin)!=0 else 1)) % 360
            for s in s_steps:
                for l in l_steps:
                    if is_gray(s,l) or is_black(l) or is_white(s,l):
                        continue
                    hx = hsl_to_hex(h,s,l)
                    if hx in used_hex:
                        continue
                    used_hex.add(hx)
                    lst.append(hx)
                    if len(lst) >= 50:
                        break
                if len(lst) >= 50:
                    break
            j += 1
        assigned[t] = lst[:50]

# Output in requested format — print at least 20 per tab, but we generated 50 each
order = ['Red','Pink','Orange','Yellow','Green','Mint','Blue','SkyBlue','Purple','Brown','Beige','Gray','Black','White','Neon']
# Ensure all keys exist
for k in order:
    if k not in assigned:
        assigned[k] = []

output_lines = []
for k in order:
    output_lines.append(f'[{k}]')
    for hx in assigned[k][:50]:
        output_lines.append(hx)
    output_lines.append('')

out_path = 'tools/generated_palettes.txt'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(output_lines))
print('WROTE', out_path)

# End of script
