'''
Score:
1. Safety       (int) 0 or 1
2. Transparency (int) 0 or 1
3. Emission     (int) distance
4. Season       (arr) months
Total avg.

Rule:
1. Same ingredient can only be bought once
2. Bought ingredient that is not on grocery list will not be counted
'''

from operator import itemgetter
from datetime import datetime

FARTHEST_DIST = 374.36

def calculate_total_score(grocery, cart):
    safety_score = 0
    transparency_score = 0
    emission_score = 0
    season_score = 0

    curr_month = datetime.now().month

    grocery = sorted(grocery, key=itemgetter('name'))
    cart = sorted(cart, key=itemgetter('type'))

    total_ingredient = len(grocery)
    offset = 0

    for i in range(total_ingredient):
        while (cart[i + offset]["type"] != grocery[i]["name"]):
            offset += 1

        safety_score += cart[i]["score"][0]
        transparency_score += cart[i]["score"][1]
        emission_score += cart[i]["score"][2]
        if cart[i]["score"][3][0] == 0:
            season_score += 1
        else:
            for month in cart[i]["score"][3]:
                if month == curr_month:
                    season_score += 1

    safety_score *= 1 / total_ingredient * 25
    transparency_score *= 1 / total_ingredient * 25
    emission_score *= 1 / (total_ingredient * FARTHEST_DIST) * 25
    season_score *= 1 / total_ingredient * 25

    total_score = safety_score + transparency_score + emission_score + season_score

    return [int(total_score), int(safety_score), int(transparency_score), int(emission_score), int(season_score)]