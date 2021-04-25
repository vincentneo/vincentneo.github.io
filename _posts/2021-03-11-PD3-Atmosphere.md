---
layout: post
title:  "Atmosphere Development Log"
headerImage: "assets/2021-03-11/graphics/header3-min.png"
subtitle: "Bored? Try identifying a cloud!"
date: 2021-03-11 08:00:00 +0800
categories: ["rp", "atmosphere", "app"]
---

Fluffy clouds are everywhere. They come in many different shapes and sizes, yet, not many of us know that they are actually characterised respectively according to their sizes.

In actuality, there clouds can be classified with genera, species, features, and even accessories, based on their appearances, height, and traits.

In general, there are 10 major genera of clouds, in the Troposphere, which is a layer in the Earth's atmosphere. Being the lowest layer of the atmosphere, it is a layer that houses the typical clouds that we can easily see. 

While these cloud facts are unbeknownst to many, there exists a group of people around the world, with a hobby of cloudspotting, and this group of people is just starting to grow.

The lockdowns around the world in 2020, resulted in many staying at home, staring outside the windows, looking at the skies, the birds and the clouds. The Cloud Appreciation Society, founded in the UK, back in 2005, even saw a spike in people joining their membership. There are over 50 thousand paying members registered in the society. 
                  
However, to a complete beginner, how would one succeed in identifying their first cloud's genus?

## Issue & Solution

Someone that only started to have some interest in clouds might lose interest by the need to describe a cloud through text descriptions or by manually comparing images of different clouds from the internet. There are tons of possible cloud combinations, and some clouds types may be easily mistaken into another type.

Instead of providing the beginners, with images, word descriptions, why not leverage on the power of Machine Learning to try and let their smartphones detect the cloud type for them? Along the way, they can even 'collect' images of clouds that they have seen, of different types and species, all in the same app, for convenience.

The above is the idea of my new "Atmosphere" app. 

Beginners get to know the genus of the cloud that they are seeing, with the specifically trained Object Recognition AI model working behind the scenes, to provide a live overlay, detecting and providing information to the user, all in real time. Simply tap the camera button, and they will be able to store the image of the cloud, together with the genus information that they have gotten. 

More advanced users get to do more. When the image is saved, they can choose to add additional information, to their cloud image entry, and even edit the AI provided information.

One can easily export or share their cloud images, taken in the app, for use in other apps, social media, or photo library. Some snippets of facts of the clouds can also be viewed in the app. 

Now that the app is out, let me walk you through on the process of making the Atmosphere app.

## How it's made

Firstly, I need an AI model, in order to be able to detect and classify clouds. First steps, naturally, is to start training a cloud recognition model. There are many ways to start training, but thankfully, since I am making an iOS app, I am able to simplify the process through the use of Apple's [Create ML](https://developer.apple.com/machine-learning/create-ml/), as there is no need to write any code.

### The First Mistake 😕
{% include article-img.html imagePath="/assets/2021-03-11/screenshots/create.wrong.project.png" %}
At first, I chose the "Image Classification" template, and trained up my first model. Tested it with a few images that contained clouds, not from the training set, and while not very accurate, seems to work.

I happily trained another 4 models, each with a larger training data set. At this point, silly me was thinking that machine learning is so quick and easy — my final model only took mere minutes to complete.

Just as I thought that it would be a simple project, from start to finish, things start to take a turn for the worst, when I realised something, that should have been realised much earlier.

{% include article-img.html imagePath="/assets/2021-03-11/screenshots/wrong.windows.png" subtitle="CloudAI 3 II uses same data set, different config." %}

I only realised it when I was about to start the training for the model which I named as "CloudAI 5", which would have consisted 5 cloud types for detection, and a training data set of 92 images. 

The mistake poses a severe issue. Here's why:

{% include article-img.html imagePath="/assets/2021-03-11/screenshots/cloudSample.png" subtitle="Altocumulus? We can clearly see some Cumulus clouds, but let's give it the benefit of the doubt, for what it is now." %}

Inaccurate? Yes. Are clouds in the scene? Also a Yes... I thought, let's give it some chance, since its still early on.

That was basically what I was doing in my early testings. A bunch of images that included clouds, nothing more. Then curiosity hit me, and I threw in a random image, one without a cloud, to see what happens.

{% include article-img.html imagePath="/assets/2021-03-11/screenshots/tulipSample.png" subtitle="A 🌷 tulip is also an Altocumulus cloud!? 😱" %}

99% Confidence. The image that actually had clouds in it, didn't even get such a high confidence score. Ironic.

I was shocked. I was sad. I wanted to give up. Everything that I thought I knew, came to nought.

Lesson learnt. Test something with more than one case.

So, I moved on (what else can I do? 🙁), to the next option.

## The Next Option...

{% include article-img.html imagePath="/assets/2021-03-11/screenshots/create.project.png" %}

Naturally, I chose to use the object detection template...and...

{% include article-img-float.html float="left" imagePath="/assets/2021-03-11/screenshots/json.needed.png" %}
 
JSON file? So, what exactly in a JSON file does it want? The previous template that I was using in Create ML, accepted images in folders with the expected item type as the name of the folder, and that was enough.

I went on researching about the JSON file requirement, and eventually found how much I did not know about machine learning 🙃. 

How did the algorithm know which part of the image that it's 'looking' at, is said object? The JSON is supposed to tell that, and I can't believe I didn't think of it. Next question, for me, is how do I declare the x and y in the JSON file to properly annotate that information? I needed an app. 

Understandably, there didn't appear to be a free option, which I expected, due to the potential of how much such an app could have gotten in sales, as there would have been individuals like me. After reading up, I used [RectLabel](https://apps.apple.com/sg/app/rectlabel-for-object-detection/id1210181730?mt=12), which costs $3.98 per month, with the first month being free.

{% include article-img.html imagePath="/assets/2021-03-11/screenshots/rectlabel.png" %}

It wasn't that hard, as the end goal was to simply draw bounding boxes of what I presume is of the right cloud type, before exporting it as an `annotations.json` file, ready for use in Create ML. You can preset a couple of objects that you will be having in your project in the app, such that it becomes easier to annotate a few hundred images later, so that's precisely what I did.

{% include article-img-float.html float="right" imagePath="/assets/2021-03-11/screenshots/rectlabel.sort.png" %}

If only RectLabel had a 'Sort Image by last added date', things would be even better, since my newly added images might not be one that is recently taken. But oh well, it works well enough for me to continue on.

## The actual training
{% include article-img.html imagePath="/assets/2021-03-11/screenshots/createml.training.png" subtitle="Screenshotted this before I updated my Mac... Pardon the UI discrepancies 🙂"%}

Inserted the new training data set, with the annotations JSON file, and I was ready to train an AI model again. I get to choose the algorithm to use for the training, and I chose Full Network/YOLOv2 in Create ML. I will talk about why I chose that instead of the other option, later in this article.

My first set consisted of 5 cloud types, comprising of 88 images, running for a total of 3000 iterations. Training took roughly 20 minutes. 

### The results?
{% include article-img.html imagePath="/assets/2021-03-11/screenshots/cloudSample2.png" %}
Thus far, looking good... Clouds are properly detected as Clouds.

{% include article-img.html imagePath="/assets/2021-03-11/screenshots/tulipSample2.png"%}
Great! Tulips are finally not clouds. 

With that, I grew faith in it, as I tested it against more images. Eventually, I retrained the models with 8 other data sets, each, building on top of the previous data set. 

{% include article-img-float.html float="right" imagePath="/assets/2021-03-11/needMoreRAM.jpg" %}
The last data set that I trained with, consisted of 317 images altogether, and took me almost 4 hours to complete.

This final training kept eating up all my system's available memory, utilizing all it could with my 16GB of installed memory, and even more through swap memory.
Eventually it stalled, and gave an unknown error, but thankfully, I was able to resume it. 

Interestingly, memory utilization fell to 0 on pause, and slowly rised, which probably suggests a memory leak in Create ML? 
Things were also fine before I updated to macOS Big Sur. I guess only Apple engineers would know what's wrong.

Early models (trained in macOS Catalina) had the size of 64MB, but the final model (trained in macOS Big Sur) had the size of 32.1MB, despite using the same algorithm, albeit with 4x longer time than the closest previous model.

#### Why YOLOv2? 
YOLOv2 is outdated. I know. But in Create ML, there's only two options, and at this point, I am not interested in going to a non code-less solution for training.
{% include article-img-float.html float="right" imagePath="/assets/2021-03-11/screenshots/algorithms.png" %}
The other option is Apple's new Transfer Learning algorithm, only available in the newer OSes. 

I tried training using the Transfer Learning method, and while it looked promising while training, the actual results were totally horrible. Everything to it, was a cloud, which resulted in artificially low loss numbers, while training, almost leading me to believe it would be awesome. I am guessing that the model provided for, internally, is overly general purposed?

{% include article-img.html imagePath="/assets/2021-03-11/screenshots/tulipSample3.png"%}
Oh and the tulip is not just a cloud, but rather 3 clouds of different genera, at least, according to the lousy Transfer Learning model that I had trained. 

## App Prototype

I didn't spend too much time prototyping, but I did briefly design an app prototype using Adobe XD, and it looks like this:
{% include article-img.html imagePath="/assets/2021-03-11/screenshots/xd.proto.png" %}

The final app doesn't share too much resemblance to its prototype, as its mostly only the structure that's kept, as I thought the prototype design's top bar might be overcrowded, if used in the actual app.

## App Development
As I have never worked on an app that utilizes Artificial Intelligence before, I needed to reference a lot.

In this case, I referred extensively to Apple's [Recognizing Objects in Live Capture](https://developer.apple.com/documentation/vision/recognizing_objects_in_live_capture?language=objc) sample codes, in order to understand how to use the Vision and AVKit APIs.

My first attempt of making the app was basically a modification of the sample codes, just to make sure everything works. Here's how it looks like:
{% include article-img.html imagePath="/assets/2021-03-11/firstTry.png" %}

The whole coding of the app took roughly 2 weeks, amounting to about 2700 lines of Swift code. 

By the time of release, Atmosphere allows users to take photos of clouds, with live AI analysis to provide realtime cloud type detection, based on what the camera of the device is pointing towards. Photos taken of the cloud will be stored in app, where it is all neatly classified as well. A small information tab also exists, to tell users about some factual information on the individual cloud types.

### The main camera view
{% include article-img.html imagePath="/assets/2021-03-11/kfexample2.png" subtitle="Indeed, a paper bird isn't a cloud. Good job, AI."%}
The main camera view comprises of an information bar on top, which shows the type of cloud that it is detecting, along with a confidence percentage score, that is representative of how confident the AI model is towards it's detection.

All processing is done offline, meaning nothing gets out of the device. This includes AI processing, which utilizes Apple's Vision, Core ML APIs, to deliver instantaneous results, without the use of any remote servers whatsoever.

Camera footage can often be privacy sensitive, and from the start of making this app, I made it a point, to make privacy a key point to the experience of using this app.

There are 3 buttons on the bottom. The left button allows for viewing photos and information, the centre button is a shutter button for taking photos, and the right button allows for the user to change cameras, if available on device.

{% include article-img.html imagePath="/assets/2021-03-11/realExample.png" subtitle="Real world tests" %}

When the device is rotated, the UI changes to fit for the orientation. More often than not, a slightly different landscape UI is better than forcing a portrait UI to work in landscape, at least that's what I think 😄.

### Information view
{% include article-img.html imagePath="/assets/2021-03-11/Info.png" %}

The information view is currently quite rudimentary, containing a few bits of technical information for the user. It's like, some quick reference data for cloud enthusiasts, that needs to know what code a genus of cloud falls under.

It consists of just two table views, holding data in it.

### Photo view
{% include article-img.html imagePath="/assets/2021-03-11/Images.png" %}

Images photographed by the user using this app, will be stored here. Each section header of the collection view of each genus of cloud, contains the aesthetic of a blurred, randomly chosen image that belonged to the same section, to have a unique, individualised look, for each individual user, depending on the colours of each photograph taken.

Users can select multiple images from the collection view at once, for export, or deletion. 

On pressing of an image, users will be shown with an enlarged, zoomable image for viewing. Date, along with cloud information, is provided here as well.

Users may also slide left or right, to view all other images stored on device, and is not restricted to the genus type, as I believe that this will allow for users to have more convenience when viewing images, compared to having the need of exiting the view, to select images from different genus categories. 

Exporting or deleting individual images can also be proceeded here. Cloud classification can also be edited, where invocation of said feature, can be done via clicking on the pencil button. 

As updates roll in progressively, I am aiming to let users store more information, within for each of their cloud image, so that they can classify each cloud type, better.

## Competitive Analysis

### [Cloud-A-Day](https://apps.apple.com/sg/app/cloud-a-day/id1314437708)
###### by Cloud Appreciation Ltd/Cloud Appreciation Society
{% include article-img.html imagePath="/assets/2021-03-11/Cloud-A-Day1.png" %}

This app appears to be made by the society mentioned earlier.

It is a free app that also provides cloud identification though Artificial Intelligence. 

It also supports all 10 major types of clouds, for identification. Some features of the app requires an free Cloud-A-Day account, in order to work, while other features may require a paid membership to the Cloud Appreciation Society. The AI seems to be accurate, in my testings, which is what I expected, considering that this app is from a society that extensively specialises in cloud spotting/identification, for many years. The app also provides an option for manual cloud identification, through a series of yes/no questions with images.

{% include article-img.html imagePath="/assets/2021-03-11/Cloud-A-Day2v2.png" %}

The AI seems to require an internet connection. I tried letting the app analyse an image that I had taken earlier, and it was unable to work under Airplane Mode, resulting in an endless spinner state.

The implementation of the AI identification is not realtime, and requires capture and processing.

#### Strengths
- Free app, multi-platform support.
- Holds extensive data of cloud types.
- [Earlier iteration](https://cloudspotterapp.com) of app is backed by NASA. Tens of thousands of paying members in said society.
- Allows for AI analysis on image imported from Photo Library of device (planned Atmosphere feature for future.)
- Appears to give out achievements to account holders, for each cloud spotted.
- Membership allows for more extensive interactions between like-minded people, potentially enhancing app usage experience. 

#### Weaknesses
- Privacy concerns, considering the AI recognition appears to be cloud-based. (pun unintended)
- No real-time AI processing.
- Many features, including collecting of cloud images, appears to require at least a free account.
- Requires internet connection.

#### Opportunity
- Live AI analysis
- More optimization, could be good if they tell us if internet connection is required instead of endless spinner loading.

#### Threat
- Backed by so many people meant this app is strong.
- Data set and imagery is extensive.

### [Coton](https://cotonapp.com/en)
###### by Etamin Studio
{% include article-img.html imagePath="/assets/2021-03-11/Coton.png" %}

Coton is an app that contains tons of images of different types of clouds. It also contains interactive pages of content, for users to know more about clouds, including cloud formation, etc.

The app seems to be poorly optimized for newer iPhone models, such as the one that I am using, which has the newer notch design, with curved screen corners, that debuted in the iPhone X. Certain parts of the User Interface (UI) is noticeably clipped by the notch, and cannot be viewed as probably intended. App hasn't been updated since Feb 2019. 

#### Strengths
- No internet connection needed.
- Strong images and visuals to teach users about clouds. (animated as well!)
- Contains extensive information for learning (such as cloud formation)

#### Weaknesses
- No AI recognition.
- UI scaling on modern devices can be better.
- Upfront cost of $2.98 (SGD)
- Random popups to tell people to like its Facebook page is a little annoying.
- Last updated years ago.

#### Opportunities
- Use AI for cloud identification.
- More images, since its one of its strongest points, the more the merrier.
- UI can be done up better to fit modern devices.

#### Threat
- Strong visuals are a great way to attract users.

### Conclusion 
Atmosphere is an app developed independently by myself, as part of a 4 app series for my portfolio development project of my diploma course.
You can get Atmosphere for free in the [App Store](https://apple.co/3qAPDmH), with an in-app purchase to unlock all features, and supports future development. The basic real-time AI analysis is available for free, and do not require an in-app purchase.

Thanks for reading!

### References

##### Articles Referenced

- Ceranic, I. (2020, June 12). [Cloud spotting gains new fans amid coronavirus pandemic as people search for calm.](https://www.abc.net.au/news/2020-06-12/cloud-appreciation-society-takes-pleasure-in-magic-of-clouds/12341166) ABC News.
- Weng, L. (2018, December 27). [Object Detection Part 4: Fast Detection Models.](https://lilianweng.github.io/lil-log/2018/12/27/object-detection-part-4.html) Lil’Log.

- [Recognizing Objects in Live Capture, Sample Code.](https://developer.apple.com/documentation/vision/recognizing_objects_in_live_capture) (n.d.). Apple Developer.

- [Setting Up a Capture Session.](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/setting_up_a_capture_session) (n.d.). Apple Developer. 