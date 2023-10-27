// Home Page
// Setup Fetch Parameters
const publicKey = "252966645ed66710aeaff3cd1c74ad27"; //Define registered marvel public key
const privateKey = "ea732535cebf66ed537da70786c543d4398c4049"; //Define registered marvel private key
const dat = new Date(); // Get date instance to setup date range for latest comics
const dateRng = new Date(dat.setMonth(dat.getMonth() - 3)).toISOString() + "," + new Date().toISOString(); //Setup date range
const hash = CryptoJS.MD5(1 + privateKey + publicKey).toString(); // hash is required by marvel API

// Fetch API Function
function fetchComics(cnt, ofst) {  // Set cnt arg as Comics Already Loaded in Home Page to Add New comics and Keep Loaded Ones When User Click "Load More" Button
  // and Set ofst arg as Total of Previously Fetched comics to Fetch New Comics
  const apiUrl = `https://gateway.marvel.com:443/v1/public/comics?format=comic&formatType=comic&ts=1&dateRange=${dateRng}&apikey=${publicKey}&hash=${hash}&limit=10&offset=${ofst}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Iterate through Flex Box to Add Comics
      for (let i = cnt; i < cnt + 10; i++) {
        // Add Required Html Elements and Event Listener
        var url = data['data']['results'][i - cnt]['urls'][0]['url']; //This url redirect to comic detail in marvel.com
        document.getElementById('colStrt').innerHTML += '<div class="col cardsCol"><div class="card position-relative" id="card' + i + '" onclick="window.location.href = ' + "'" + url + "'" + '"><img src="" class="card-img-top shadow-sm comicImgs" alt="Comic Img"><div class="card-body"><h5 class="card-title comicTitle"></h5><h5 class="comicSubTitle"></h5></div></div>'
        // Add Respective image parts of Comic
        var img = data['data']['results'][i - cnt]['thumbnail']['path'] //comic's image partial url
        var ext = data['data']['results'][i - cnt]['thumbnail']['extension'] //this is extensions of comic's image
        var imgSize = "/portrait_incredible." //define the size of comic's image
        document.getElementsByClassName('comicImgs')[i].src = img + imgSize + ext //combine image partial url, image size, image extension to get complete image source url
        // Add Respective Comic's Title
        document.getElementsByClassName('comicTitle')[i].innerHTML = (data['data']['results'][i - cnt]['title']).replace('(2023)', '').replace('(2022)', '')
        // Add Respective Comic's first creators (in array) and add number of remaining creators to the text
        document.getElementsByClassName('comicSubTitle')[i].innerHTML = data['data']['results'][i - cnt]['creators']['items'][0]['name'] + ' and ' + (data['data']['results'][i - cnt]['creators']['items'].length - 1) + ' more'
      }
    })
    .catch(error => console.error("Error:", error));
}

// Fetch API When Site Load
fetchComics(0, 0);

// Add onClick Event for Load More Button at Home Page
document.getElementById('fetchComicBtn').onclick = function () {
  fetchComics(document.getElementsByClassName('comicImgs').length, document.getElementsByClassName('comicImgs').length + 9);
}

// Overwrite Carousel Duration On Home Page
const carousel = new bootstrap.Carousel(carouselExampleCaptions, {
  interval: 3000,
  touch: false
})

// Events Page
// Fetch API Function
function fetchEvents(cnt, ofst) {  // Set cnt arg as Events Already Loaded in Events Page to Add New Events and Keep Loaded Ones When User Click "Load More" Button
  // and Set ofst arg as Total of Previously Fetched Events to Fetch New Events
  const apiUrl = `https://gateway.marvel.com:443/v1/public/events?ts=1&apikey=${publicKey}&hash=${hash}&orderBy=startDate&limit=10&offset=${ofst}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Iterate through Flex Box to Add Events
      for (let i = cnt; i < cnt + 10; i++) {
        // Add Required Html Elements and Event Listener
        var url = data['data']['results'][i - cnt]['urls'][0]['url']; //This url redirect to Event detail in marvel.com
        document.getElementById('colStrtEvent').innerHTML += '<div class="col mt-1 cardsCol"><div class="card" id="eventCard' + i + '" onclick="window.open(' + "'" + url + "'" + ')"><div class="position-absolute bg-secondary w-100 text-bg-dark px-1 eventOverlay" style="opacity:0.85; font-size: 0.80rem"></div><img src="" class="card-img-top shadow-sm eventImgs" alt="Event Img"><div class="card-body"><h5 class="card-title position-relative z-3 eventName"></h5></div></div>'
        // Add Respective image parts of Event
        var img = data['data']['results'][i - cnt]['thumbnail']['path'] //Event's image partial url
        var ext = data['data']['results'][i - cnt]['thumbnail']['extension'] //this is extensions of Event's image
        var imgSize = "/standard_amazing." //define the size of Event's image
        //All-New All-Different Marvel doesn't has image so I assign a custom image only for this event to prevent missed image
        if (data['data']['results'][i - cnt]['title'] == 'All-New All-Different Marvel') {
          document.getElementsByClassName('eventImgs')[i].src = '/img/allInOne.png'
        } else {
          document.getElementsByClassName('eventImgs')[i].src = img + imgSize + ext //combine image partial url, image size, image extension to get complete image source url
        }
        // Add Respective Event's Title
        document.getElementsByClassName('eventName')[i].innerHTML = data['data']['results'][i - cnt]['title'];
        // Add description display on hover, if description exceeded 300 in length state 'click for more' 
        var desc = (data['data']['results'][i - cnt]['description']);
        if (desc.length > 325) {
          document.getElementsByClassName('eventOverlay')[i].innerHTML = desc.substr(0, 300) + '.........<br><span class="fw-bold">click for more....</span></br>';
        } else {
          document.getElementsByClassName('eventOverlay')[i].innerHTML = desc;
        }
      }
    })
    .catch(error => console.error("Error:", error));
}

//Add event to Events link in navbar
document.getElementById('eventNav').onclick = function () {
  // for first time total number of loaded comics is 0 and offset is 0
  fetchEvents(0, 0);
  //Hide comics section
  document.getElementById('comicCardsMain').classList.add('d-none')
  document.getElementById('comicCardsMain').classList.remove('d-block')
  //Display events section
  document.getElementById('eventCardsMain').classList.remove('d-none')
  document.getElementById('eventCardsMain').classList.add('d-block')
  //Toggle active class for active page
  document.getElementsByClassName('nav-link')[0].classList.remove('active')
  document.getElementsByClassName('nav-link')[1].classList.add('active')
}

//when user click on load more button call fetch API function with required argus
document.getElementById('fetchEventBtn').onclick = function () {
  fetchEvents(document.getElementsByClassName('eventImgs').length, document.getElementsByClassName('eventImgs').length + 9);
}


//Search Function
//Setup modal, showing modal when user click on search navbar link by trigger data-bs-toggle, data-bs-target attributes
function modal() {
  const myModal = new bootstrap.Modal('#searchModal', {
    keyboard: false
  })
  myModal.show()
}

//Run search function (searchCraze) when user finish typing then press enter key or click on search button
document.getElementById('searchInput').onchange = function () {
  searchCraze(document.getElementById('searchInput').value)
}

//When user change search box value clear search results and return back search button to its original state
document.getElementById('searchInput').oninput = function () {
  document.getElementById('addData').innerHTML = ''
  document.getElementById('searchBtn').classList.remove('bg-primary')
  document.getElementById('searchBtn').classList.remove('text-white')
  document.getElementById('searchBtn').innerText = 'Search'
}

//Fetch API function
function searchCraze(searchText) {
  //Clear search results area
  document.getElementById('addDataParent').style.overflowY = 'unset'
  document.getElementById('addDataParent').style.maxHeight = 'unset'
  document.getElementById('searchInput').disabled = true;
  const apiUrl = `https://gateway.marvel.com:443/v1/public/comics?format=comic&formatType=comic&ts=1&apikey=${publicKey}&hash=${hash}&titleStartsWith=${searchText}&orderBy=-onsaleDate&limit=99`;
  fetch(apiUrl)
    .then(response => response.json())
    .then((data) => {
      results = data['data']['results']
      //if results > 0 then setup results area
      if (results.length > 0) {
        document.getElementById('addDataParent').style.overflowY = 'scroll'
        document.getElementById('addDataParent').style.maxHeight = '400px'
      }
      document.getElementById('searchInput').disabled = false;
      document.getElementById('searchInput').focus();
      //Start iterate through results array of objects to get search results
      //Hold details url in hidden span to use it when user click on open button 
      for (let i = 0; i < results.length; i++) {
        document.getElementById('addData').innerHTML += '<tr><td><span class="d-none">' + results[i]['urls'][0]['url'] + '</span>' + results[i]['title'] + '</td></tr>'
      }
    })
}

//Get current row data of results when user click on selected result and add its value to search box
const tbody = document.querySelector('#addData');
tbody.addEventListener('click', function (e) {
  document.getElementById('searchBtn').innerText = 'Open'
  document.getElementById('searchBtn').classList.add('bg-primary')
  document.getElementById('searchBtn').classList.add('text-white')
  cell = e.target.closest('td');
  document.getElementById('searchInput').value = cell.innerText
});

// Open detail link when user click on open button if user select result or implement the search
document.getElementById('searchBtn').onclick = () => {
  if (document.getElementById('searchBtn') == 'search') {
    searchCraze(document.getElementById('searchInput').value)
  } else {
    window.open(cell.children[0].innerHTML);
  }
}

//when search modal shown set search box focus
const myModalEl = document.getElementById('searchModal')
myModalEl.addEventListener('shown.bs.modal', event => {
  document.getElementById('searchInput').focus();
})

//reset modal when shown
myModalEl.addEventListener('hidden.bs.modal', event => {
  document.getElementById('addDataParent').style.overflowY = 'unset'
  document.getElementById('addDataParent').style.maxHeight = 'unset'
  document.getElementById('addData').innerHTML = ''
  document.getElementById('searchInput').disabled = false;
  document.getElementById('searchInput').value = ''
  document.getElementById('searchBtn').innerText = 'Search'
})
