from urllib2 import urlopen
import json

def to_geojson():
    url = 'http://crowdcrafting.org/app/landfill/tasks/export?type=task_run&format=json'
    fp = urlopen(url)
    orig = json.load(fp)

    features = list(filter(None, map(merge_record, orig)))
    return json.dumps({
        "type": "FeatureCollection",
        "features": features,
    })

def merge_record(record):
    '''
    Return a single polygon or None.
    To do: Make this actually merge.
    '''
    record = dict(record)
    area = record['info'].pop('area')
    record.update(record.pop('info')) # Keep information about the person who drew the polygon.
    if area != 0:
        # polygons = (json.loads(x['area_geometry'] for x in area))
        geometry = json.loads(area[0]['area_geometry'])
        record["area"] = area
        result = {
            "type": "Feature",
            "geometry": geometry,
            "properties": record,
        }
        return result

if __name__ == '__main__':
    print(to_geojson())
