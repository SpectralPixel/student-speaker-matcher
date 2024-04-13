# Student Speaker Matcher

This repo is dedicated to a small group project assigned to us for IT class.

## Task

The task given was to create an algorithm for an upcoming event at school where people will come in to give talk about their professions. Not every student will be able to listen to every talk, so the algorithm makes the student pick their three favorite school subjects and will then find the most relevant speakers to their interests.

## Algorithm

As you can imagine, the smartest kids from the other competing groups single-handedly came up with algorithms and presented them to the class as if they weren't the only person in their group who has the slightest idea of how to code stuff. They all came up with perfectly leetcode-y answers, where all speaker will be assigned a value and all subjects will be assigned a value and yadda yadda yadda yadda...

Only one problem though: the speakers haven't been announced yet, meaning that everyone will be under time pressure to fine-tune their algorithms when the list is finally revealed, say, a week before the event. That sounds like hell. Making a proper list and weighting all the different speakers and subjects takes time and effort.

Our solution to this problem was lazy, yet valid. If it can do it's job, it's a correct solution, right? So we decided to make a small front-end where the user can list their favorite subjects, and import a list of speakers (we might remove this later on in favor of a hard-coded list, to make the whole process easier fo the user). The lists are then used to query ChatGPT for a solution. This removes the need for any fine-tuned algorithm, or any other solution that requires tweaking/training an algorithm. All the hard work is offloaded. This allows us to focus out limited time and resources towards making the the most pleasing interface, which the competing groups won't be able to compete with.

## Division of labour

@EncryptedDvjjrxv: coordination, GitHub repo management & automation
@peselis: back-end (js for querying ChatGPT), server, worked on front-end too
@Makki3608: in charge of front-end (HTML, CSS, UI/UX)

