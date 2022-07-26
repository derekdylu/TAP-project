'''
Score:
1. Safety       (int) 0 or 1
2. Transparency (int) 0 or 1
3. Emission     (int) distance
4. Season       (int) month
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

    grocery = sorted(grocery, key=itemgetter('type'))
    cart = sorted(grocery, key=itemgetter('type'))

    total_ingredient = len(grocery)
    offset = 0

    for i in range(total_ingredient):
        while (cart[i + offset]["type"] is not grocery[i]["type"]):
            offset += 1

        safety_score += cart[i]["score"]["safety"]
        transparency_score += cart[i]["score"]["transparency"]
        emission_score += cart[i]["score"]["emission"]
        season_score += 1 if cart[i]["score"]["season"] == curr_month else 0

    safety_score *= 1 / total_ingredient * 25
    transparency_score *= 1 / total_ingredient * 25
    emission_score *= 1 / (total_ingredient * FARTHEST_DIST) * 25
    season_score *= 1 / total_ingredient * 25

    total_score = safety_score + transparency_score + emission_score + season_score

    return total_score, safety_score, transparency_score, emission_score, season_score