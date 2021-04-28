---
layout: post
title:  "What's Next for Sunlight?"
headerImage: "assets/sunlight-next.png"
subtitle: "Sunlight has been out for over a month, and there has been 2 incremental updates. What's next?"
date: 2020-11-15 10:38:00 +0800
categories: ["sunlight", "app development", "app"]
---

Sunlight has been an incredible project that I never thought I would be able to create myself.

Sunlight was started as a project to challenge myself, and to learn [WidgetKit](https://developer.apple.com/widgets/), during my month of study break. [WidgetKit](https://developer.apple.com/widgets/) was recently launched in WWDC2020, and I really wanted to play with it. Sunlight was that experiment. 

{% include article-img.html imagePath="/assets/sunlight-widget.png" %}

## The initial idea

It started with the widget. I did the widget first before anything else. I started using [SunCalc-Swift](https://github.com/shanus/suncalc-swift) to calculate the rise and set times of a day, to roughly move the "sun" of the widget. The sun was made to mimic the rising and setting of the sun in a day, and when at night, a bunch of stars will randomly dot the "sky".

The current version of the widget is very similar, if not exact, to the original, with just some minor additions like the optional location name.

The app was developed after the widget. The idea of the app was to show as much information as I could provide for the current day. As things grew larger, I started noticing discripancies of the computed times, and eventually migrated to [SwiftAA](https://github.com/onekiloparsec/SwiftAA) library, which was way harder to use, as it included a bunch of extra astronomy stuff, that, honestly, I could not understand.

Eventually, the migration was done, and all computations of time is done in that library. To fix a bug regarding moonrise and set times, I did write up some wrappers for that library to expose some more of its underlying C++ code that contained a newer implementation, one that does not cause that bug. That remains as a fork at time of writing, but is happily serving the users of Sunlight, since version 1.2. 

## Next steps

{% include article-img.html imagePath="/assets/sunlight-wid-proto.png" subtitle="Early prototype of widget" %}
Firstly, I am planning on adding more widgets. I could see that some users probably would want more information over visuals, so I am planning to have something more infomation focused than on design.

{% include article-img.html imagePath="/assets/sunlight-app-future.png" %}
Secondly, changable time. I've seen requests on this, so I might implement this in the future, considering its usefulness. Basically, instead of only being able to get computations for today, users would be able to get computations for past or future days, should this feature materialise. 

{% include article-img.html imagePath="/assets/sunlight-1.2-bug.png" %}
Lastly, bug fixes. Of course, no apps are flawless in this world. Developers are humans too, and they make mistakes, 1 make m1stakes too, and, frankly, I am not shy of the mistakes I made... 🤭 I've witness a scenario where the text for the moon phase turns empty. Look at that image above! 
