# Comic Craze
Comic Craze is a compact and focused project created for the Code the Dream ADVANCED PRE-WORK ASSIGNMENT

## Installation
Download 3 folders: img, js, style and HTML single file: index.html to the root server directory.
The website has been hosted on free host 000webhostapp.com and work well, the link is: 
https://comiccraze.000webhostapp.com

## Project Design
The design is straightforward and unconventional, intended solely to serve the project's purpose.

## Project Functionality
The project use 3 models of marvel API
1. Comics
2. Events
3. Comics Search

## Frameworks
Bootstrap is the sole framework used in the project, even though no framework is strictly necessary. Bootstrap was chosen for its ability to expedite execution.

## Libraries
The project exclusively utilizes the Crypto library because of Marvel API regulations. It's essential to hash the API keys parameter.

## Project Pages
As the project consists of just two pages, there is a single HTML page that operates by toggling the display to show or hide sections based on the user's selection of either Comics or Events

## Comics Page
Comic page retrieve comics filtered by a date range set to three months from the current date. Upon website load, the first ten results are displayed on the Comics page. Users can click the 'Load More' button to fetch additional new release comics

## Events Page
The Events page functions similarly to the comics page, with results not filtered but sorted by the Event Start Date, ensuring that the most recent events appear first. The page initially displays the first 10 events, and users can click the 'Load More' button to load another set of 10 events and continue doing so.

## Search
When the user clicks the 'Search' menu link, a modal will appear where they can input search criteria. The user can then either press the Enter key on the keyboard or click the search button. In both cases, results will appear below the search input as a list, allowing the user to select their desired comic. After that, the search button will transform into an 'Open' button with a new function, which is to open the comic detail page on Marvel.com.

