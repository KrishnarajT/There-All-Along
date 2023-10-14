# Why the current tech stack was chosen.

The short answer would be that these may be the technologies that I am familiar with, but I feel like justifying this would be helpful at some later stage.

## Frontend

1. React Native was chosen over android studio, because it is deployable everywhere, and I have some experience with it. I have more experience and a better one too with android studio, but I wanted more customization with the UI, and coz I am very familiar with React, this seemed a good choice.

2. Contexts are chosen over Redux, coz of how much easier they are.

## Backend

1. This is where it gets complicated. The scale of this app can grow. At least that is the hope. So, I wanted to use a scalable solution. I have used firebase before, and it is pretty easily scalable, and the costs are also reasonable. I can use cryptodb for database, or firebase realtime database. There are a lot of options. I can even use sqlite, and it would be very easy. But we may even wanna store images and other unstructured data. So a nosql databsae is preferred.

That leaves us with Cryptodb and Firebase. Firebase is definitely more user friendly. Has much better support and documentation, so I am going with that over cryptodb.

Yet another question is why im using a backend in the first place. I could just use the sdk with react native and firebase, but i am not doing that, instead i am using a deployed backend on cyclic, because someday i may wanna add more functionality in the backend, and more importantly, this gives me a lot of flexibility to change the backend without actually even touching the frontend.

This way, i dont have to mess around with the app once its done, and more importantly with its core functionalities regarding data storage. So a backend is totally advisable here, atleast thats what I think.

So That then means which backend to choose? node and express, or python and fastapi. No way im gonna choose django, coz i dont know how to use it in the first place. Both fastapi and django work with all databases, but i dont really wanna learn django.

So fastapi it is. But why not node and express? Now this may sound weird, but i dont mind either, and iv worked with both, but id rather use python, coz its gonna be my main language going ahead, and also python because there may be some machine learning stuff that i may wanna do in the future, and python is the best for that. So most of the choices are done considering future proofing the app. Lets see how it pans out.
