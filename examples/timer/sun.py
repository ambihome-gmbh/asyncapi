from astral import LocationInfo
from astral.sun import sun, time_at_elevation, SunDirection
import datetime
import json

def get_sun_times(date, latitude, longitude):
    city = LocationInfo(latitude=latitude, longitude=longitude)
    observer = city.observer

    s = sun(observer, date=date)

    # Compute twilights using the correct function signature
    morning_astro_twilight = get_time_at_elevation(observer, -18, date, SunDirection.RISING)
    morning_nautical_twilight = get_time_at_elevation(observer, -12, date, SunDirection.RISING)
    morning_civil_twilight = get_time_at_elevation(observer, -6, date, SunDirection.RISING)

    evening_civil_twilight = get_time_at_elevation(observer, -6, date, SunDirection.SETTING)
    evening_nautical_twilight = get_time_at_elevation(observer, -12, date, SunDirection.SETTING)
    evening_astro_twilight = get_time_at_elevation(observer, -18, date, SunDirection.SETTING)

    sun_times = {
        "morning_astronomical_twilight": morning_astro_twilight,
        "morning_nautical_twilight": morning_nautical_twilight,
        "morning_civil_twilight": morning_civil_twilight,
        "sunrise": get_h_m(s["sunrise"]),
        "midday": get_h_m(s["noon"]),
        "sunset": get_h_m(s["sunset"]),
        "evening_civil_twilight": evening_civil_twilight,
        "evening_nautical_twilight": evening_nautical_twilight,
        "evening_astronomical_twilight": evening_astro_twilight,
    }

    return sun_times

def get_h_m(date):
    (_,_,_, h,m,_,_,_,_) = date.timetuple()
    return h,m

def get_time_at_elevation(observer, elevation, date, direction):
    try:
        time = time_at_elevation(observer, elevation, date, direction)
        return get_h_m(time)
    except ValueError:
        return None
    

date = datetime.date(2025, 6, 21)
latitude, longitude = 52.52, 13.405  
sun_times = get_sun_times(date, latitude, longitude)

print(json.dumps(sun_times, indent=2))
