![Static Badge](https://img.shields.io/badge/:badgeContent)

What I was thinking on creation,

Should I handle this in different pages or should I handle this on 1 page with a split of server and client components?
Answer: For User Experience, I don't want to chuck the user around to different pages, best to keep User happy and stay on 1 page

Should I use Vite + React, or NextJS,
Answer: Vite + React would definitely keep it more simple, but decided on NextJS for the SEO, also using NextJS, in my opinion, improves the long term scalability of the app as it's not a SPA, if the recipe sharing app got bigger, then SEO would be significantly better and improve traffic

The API only allows me to search for recipes based on 1 ingredient, do I loop over all the ingredients in the fridge and return what combines all of them, or what they can make based off of a few of each ingredients?

I have beef, onions, filo, oil, salt, pepper and avocado

I can make burek, but don't need avocado, but I still want to see the burek appear in my array
