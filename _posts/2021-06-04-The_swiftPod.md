---
layout: post
title:  "The swiftPod."
headerImage: "assets/2021-06-04/playbacktitle.png"
subtitle: "The iPod, that isn't."
date: 2021-06-04 10:50:00 +0800
categories: ["swift student challenge"]
---

The swiftPod is my second submission for the Swift Student Challenge. In both years, I used the SwiftUI layout system, writing fully in Swift.

My first submission was a playground that mimics the classic Macintosh OS environment, and that was a success, allowing me to have the honours of being one of the 350 winners worldwide for the WWDC 2020's Swift Student Challenge.

In 2021, I am back again for the challenge, and this time I am mimicing, not just an OS, but rather a device.

The iPod lineup holds a special position in my heart. My second Apple product was the 3rd generation iPod touch. It was the product that got me interested in apps, how they work and how they make a difference.

Back in the days of skeumorphism, colours are aplenty, along with the almost lifelike iconography. I loved it. There were tons of apps on the store, doing different things, having different designs, everything was so, made for everyone. 

I wanted my app on the store too.

I wanted to be an app developer.

I was just a primary school-going child, at that point.

Fast forward many years, I picked up Swift. Even more years later, and we've reached the point of the start of the COVID-19 pandemic. Lessons from my current institution became home-based. A blessing in disguise, for me at that point of time, I had more free time due to the lack of commute, and hence, more time for me to discover and to dare to try something new.

That. That was the Swift Student Challenge of 2020.


A year later, I had mixed feelings about joining Swift Student Challenge for 2021. I knew it would be a busy year. In fact, just as I am writing this right now, I just only closed another project and concluded it. But unexpectedly, the Swift Student Challenge was announced right before my study-break weeks, ends.

And so, I tried to replicate a 3rd generation classic iPod. Time was just right.

I always saw the classic iPod as a cool product, especially so, for the 3rd generation. It had a very clean aesthetic, and lights up amber for its backlights for the buttons row. That was the only iPod in the entire line up that had that look.

So I started it working on it. 

I started with the overall frame. I had referenced a couple of old images posted online, and made the frame of the swiftPod as alike as the real deal.

{% include article-img-v.html imagePath="/assets/2021-06-04/menu.png" subtitle="" %}
Next, was with the menus system/logic. It was rather simple, where it basically had all menus linked to one another, guaranteeing back and forth movements from the code itself.

Followed by the scroll wheel. That was implemented with, none other than a DragGesture. It was basically an effort to measure the drag movements as an angle, since the scroll wheel is a circle. movements are notified to other views via a NotificationCenter notification.

## The main 'software'
After the 'hardware' controls of the swiftPod was implemented, the 'software' was next.

One of the hardest-to-make 'software' was the Solitaire game. 

{% include article-img-v.html imagePath="/assets/2021-06-04/solitaire.png" subtitle="" %}

It consisted of many stacks of all kinds (HStack, VStack and ZStack), and was rather hard to implement, both the logic and the design. I had the luxury to have an O'Reilly Books subscription made available by my institution for all students, which enabled me to understand how the solitaire game worked in that real life iPod. I also found an old video online that aided me in that too. All controls seemed to be made on the scroll wheel only, and that card stacks will shrink themselves when theres is too much cards in a single stack.

{% include article-img-v.html imagePath="/assets/2021-06-04/stars.png" subtitle="" %}

The music playback and display section of the playground is also pretty complicated. As the playground allowed for users to put their own music tracks, I had used AVFoundation API to get the ID3 tags of each song so as to retrieve the song titles and other album information out from each song. Hard coding was simply not an option. 

AVFoundation's AVAsset isn't the easiest to deal with, since it appears to be quite an old API. Regardless, it was doable, and eventually I was able to extract the data I need for displaying. Playback was more smooth sailing, except with certain features of the playback view. 

{% include article-img-v.html imagePath="/assets/2021-06-04/clock.png" subtitle="" %}

Other than these features I have also intergrated backlight support, which can be triggered, either manually in the start screen, or with a backlight timer, with timeouts, just like how its like in a real iPod.

{% include article-img-v.html imagePath="/assets/2021-06-04/calendar.png" subtitle="" %}

Features less pronounced include a fully featured settings menu, along with the Notes, About, Clock, Calendar and more.

All in all, other than a few missing games, clicker noises and other features or mini deviations, I reached the (original) final day of submission, with a playground, that I would say, is 80% alike to a 3rd generation iPod. Of course, I need someone that has actually used an iPod of that generation to be able to correctly ascertain, since I have never interacted with one of that generation before, but hey, I reckon the references I've made would have made up for it :)

### Conclusion
I really enjoyed doing Swift Student Challenges. It is a chance for me to concentrate on something new, everytime I embark on it. There are no fixed rules, all freedom, yet, it is that freedom that drove a set of targets - a clear goal - that is, a final working playground that is not just nice, but also usable.

For both Challenges, I learnt a lot. Ranging from SwiftUI, to Combine to AVFoundation, from all the research, the sudden need to improvise and use something or do something that I have never done before, creates a constant state of swift thinking and adaptation that really drives learning new things.

Thanks for reading!

### References

- Biersdorfer, J. D. (2004). iPod & iTunes: Missing Manual, Second Edition (Second ed.). O’Reilly Media.

- Miller, M. (2007). iPodpedia: The Ultimate iPod and iTunes Resource (1st ed.). Que Publishing.

- Gabriel Crummer-Cowell. (2020, October 14). Solving Solitaire on a second generation iPod mini [Video](https://www.youtube.com/watch?v=hd8qZWas6eA). YouTube. 

