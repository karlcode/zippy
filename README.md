## Assignment

### Running the code
Client side code - `https://karl-zip-assignment.netlify.app/`

`npm start` for client side code

`npm run storybook` for Storybook viewing

Branch `ssr-experiment` contains the half finished SSR work 

`npm run ssr` to serve on port 10101

---

### Thoughts
I enjoyed the task as it helped me learn a lot of the nuances in JS and CSS that would otherwise be abstracted away by the frameworks I use day to day. 

In this task I tried to use as few libraries as possible, both to push my understanding of the core underlying concepts and also because I find picking up new libraries is sometimes more cumbersome than implementing the simple solution.

---

### Tooling
Setup project with create-react app. Used basic CSS and attempted to write it in React BEM style. 

CSS using grid for easier management with responsive design. 

Used quicktype for generating the TS interface of the jsonapi. Unfortunately the tool couldn't pick up the complete interface since each product page had different values (i.e retailer codes) so I was forced to abandon using the tool's type checker and just force the response as expected.

Using React.Suspense for fallback screen on the grid. This was my first time using Suspense and I think it's a really neat api for generating fallbacks. Had some confusion with the way async data fetching was meant to be configured as the convention seems to treat the data as a Resource type (and there was limited documentation around this) but once I got my head around the concept it was convenient to use.

Using `react-paginate` for the pagination component as I felt I didnt have enough time to implement one from scratch which would look good.

Using `react-loading-skeleton` for placeholder elements to be shown when UI is waiting on updates

#### SSR
Setup SSR with a simple express server. Wrestled with webpack and babel compilation issues. As documentation stated, Suspense was not compatible with SSR so I needed to upgrade to React 18/Alpha and try out the new `pipeToNodeWritable` api.

Due to limited time I wasn't able to get the SSR completely working as I'm having issues hydrating the ssr result (so it just shows the template with css & no interactivity).

---

### Design Considerations
I built the UI with a mobile first mindset so the css breakpoints reflect that I scale up changes based on the minimum width of the device. 

Addressing the prompt for the product page, I opted for a modal design that expands to highlight the product image and show product info on the side. I felt this was a conventional layout in e-commerce UIs so it felt suitable. With regard to SEO, I believe the modal view would pose a challenge when site content is being crawled by search engines so this would definitely not be a production ready approach but a fun POC.

---

### Things I'd do next time
Due to time constraints I wasn't able to implement everything I wanted to. Notably I ran out of time writing tests and making components accessible after I realised how much effort the SSR piece would be.

- Some components could have been more generic rather than have implementation tied in
- Images could be compressed further e.g webp vs png
- Some css is probably not cross-browser compatible (`gap` from memory, some filter effects)
- Start with accessible components first rather than add in compliance later
- Make use of transitions on suspense fallback (fade in/out)
- I didnt bother implementing a routing solution as I was in a rush to deliver the requirements listed out, but I would have probably used React Router & control the pagination that way (rather than using localstorage to keep the page number)





