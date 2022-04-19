
var userNameInput = document.getElementById(`userName`);
var submitBtn = document.getElementById(`subBtn`);
var nameAlert = document.getElementById(`nameAlert`);
var userEmailInput = document.getElementById(`userEmail`);
var emailAlert = document.getElementById(`emailAlert`);
var userPhoneInput = document.getElementById(`userPhone`);
var phoneAlert = document.getElementById(`phoneAlert`);
var userAgeInput = document.getElementById(`userAge`);
var ageAlert = document.getElementById(`ageAlert`);
var userPasswordInput = document.getElementById(`userPassword`);
var passAlert = document.getElementById(`passAlert`);
var userRepassInput = document.getElementById(`userRepass`);

let now_playing = "now_playing";
let popular = "popular";
let top_rated = "top_rated";
let trending = "trending";
let upcoming = "upcoming";

let ApiList = "now_playing";

$("#nowPlaying").click(function () {
    ApiList = now_playing;
    (function () {
        showMovies();
    })()

});

$("#popular").click(function () {
    ApiList = popular;
    (function () {
        showMovies();
    })()
    // console.log('popular here '+ApiList)

});

$("#topRated").click(function () {
    ApiList = top_rated;
    (function () {
        showMovies();
    })()

});


//  ليها api وحدها
$("#trending").click(function () {
    ApiList = trending;
    (function () {
        displayTrendMovies();
    })()

});

$("#upcoming").click(function () {
    ApiList = upcoming;
    (function () {
        showMovies();
    })()

});


let pageNumber = 1;
let filmData;
let movieInfo;
async function showMovies() {
    filmData = await fetch(`https://api.themoviedb.org/3/movie/${ApiList}?api_key=8f4ebbb5c6f6d4b42a491b41ec7ff8ee&language=en-US&page=${pageNumber}`)
    filmData = await filmData.json();
    movieInfo = filmData.results;
    displayAllMovies();
}
(function () {
    showMovies();
})();




async function displayTrendMovies() {
    filmData = await  fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=8f4ebbb5c6f6d4b42a491b41ec7ff8ee&page=${pageNumber}`)
    filmData = await filmData.json();
    movieInfo = filmData.results;
   
    displayAllMovies();
}


let arrayTitle =[];
let searchArray;


function displayAllMovies() {
    let cartoona = ``;
    for (let i = 0; i < movieInfo.length; i++) {
        arrayTitle.push(movieInfo[i].title.toLowerCase())
        cartoona += `
       <div class="col-md-6 col-lg-4 shadow rounded my-2">
       <div class="filmContents position-relative">
           <div class="film">
               <img src="https://image.tmdb.org/t/p/w500${movieInfo[i].poster_path}" class="w-100 img-fluid rounded" alt="">
               <div class="filmLayer d-flex align-items-center text-center ">
                   <div class="film-info ">
                       <h2>${movieInfo[i].title}</h2>
                       <p>${movieInfo[i].overview}</p>
                       <p>${movieInfo[i].vote_average}</p>
                       <p>${movieInfo[i].release_date}</p>
                   </div>
               </div>
           </div>
       </div>
   </div>
       
       `
       $(".displayMovies").html(cartoona);
    }

console.log('hi')
    
}



let wordSearch;
let imageFilm;
$("#firstSearch").keyup(function () {
    wordSearch = $(this).val();
    (function () {
        searchMovies();
    })()
    
})
async function searchMovies() {
    filmData = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=8f4ebbb5c6f6d4b42a491b41ec7ff8ee&query=${wordSearch}&include_adult=false`)
    filmData = await filmData.json();
    movieInfo = filmData.results;
   
    displayAllMovies();
}


  
$("#secondSearch").keyup(function () {
 
    searchArray= $(this).val().toLowerCase();
    displayAllMovies();
    displaySearchInArray();

})



function displaySearchInArray() {
    
    let cartoona =``;
    
    for (let i = 0; i < arrayTitle.length; i++) {
        console.log(arrayTitle[i])   
        if (searchArray == arrayTitle[i]) {
            console.log(`second`)
            cartoona += `
            <div class="col-md-6 col-lg-4 shadow rounded my-2">
            <div class="filmContents position-relative">
                <div class="film">
                    <img src="https://image.tmdb.org/t/p/w500${movieInfo[i].poster_path}" class="w-100 img-fluid rounded" alt="">
                    <div class="filmLayer d-flex align-items-center text-center ">
                        <div class="film-info ">
                            <h2>${arrayTitle[i]}</h2>
                            <p>${arrayTitle[i].overview}</p>
                            <p>${arrayTitle[i].vote_average}</p>
                            <p>${arrayTitle[i].release_date}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `
        }

        $(".showMoviesInArr").html(cartoona);
       
    }
}












$(document).ready(function () {
    let menuBoxWidth = $(".nav-menu").outerWidth();
    $(".nav-parent").animate({ left: `-${menuBoxWidth}` }, 0);
})
$("#toggleBtn").click(function () {
    let menuBoxWidth = $(".nav-menu").outerWidth();
    if ($(".nav-parent").css("left") == "0px") {
        $(".nav-parent").animate({ left: `-${menuBoxWidth}` }, 500);

        $("#toggleBtn").addClass("fa-align-justify");
        $("#toggleBtn").removeClass("fa-times");
        $(".animated-slider").removeClass("animate__bounceInUp")
    } else {
        $(".nav-parent").animate({ left: `0px` }, 500);
        $("#toggleBtn").removeClass("fa-align-justify");
        $("#toggleBtn").addClass("fa-times");
        $(".animated-slider").addClass("animate__bounceInUp")

    }


})





// rejex username 

userNameInput.onkeyup = function () {
    var nameRejex = /^[A-Z][a-z]{2,8}$/
    if (!nameRejex.test(userNameInput.value)) {
        submitBtn.disabled = "true";
        userNameInput.classList.add("is-invalid");
        userNameInput.classList.remove("is-valid");
        nameAlert.classList.remove("d-none");
    }
    else {
        submitBtn.removeAttribute("disabled");
        userNameInput.classList.add("is-valid");
        userNameInput.classList.remove("is-invalid");
        nameAlert.classList.add("d-none");
    }
}
// end of username rejex


// rejex Email
userEmailInput.onkeyup = function () {
    var EmailRejex = /@[a-z]{5,10}(\.com)$/;
    if (!EmailRejex.test(userEmailInput.value)) {
        submitBtn.disabled = "true";
        userEmailInput.classList.add("is-invalid");
        userEmailInput.classList.remove("is-valid");
        emailAlert.classList.remove("d-none");


    } else {
        submitBtn.removeAttribute("disabled");
        userEmailInput.classList.add("is-valid");
        userEmailInput.classList.remove("is-invalid");
        emailAlert.classList.add("d-none");

    }
}

// end email rejex




// phone rejex

userPhoneInput.onkeyup = function () {
    var phoneRejex = /^(00201|01)[0125][0-9]{8}$/;
    if (!phoneRejex.test(userPhoneInput.value)) {
        submitBtn.disabled = "true";
        userPhoneInput.classList.add("is-invalid");
        userPhoneInput.classList.remove("is-valid");
        phoneAlert.classList.remove("d-none");


    } else {
        submitBtn.removeAttribute("disabled");
        userPhoneInput.classList.add("is-valid");
        userPhoneInput.classList.remove("is-invalid");
        phoneAlert.classList.add("d-none");

    }
}

// end phone rejex

// start of age rejex

userAgeInput.onkeyup = function () {
    var ageRejex = /^([2-7][0-9]|80)$/;
    if (!ageRejex.test(userAgeInput.value)) {
        submitBtn.disabled = "true";
        userAgeInput.classList.add("is-invalid");
        userAgeInput.classList.remove("is-valid");
        ageAlert.classList.remove("d-none");


    } else {
        submitBtn.removeAttribute("disabled");
        userAgeInput.classList.add("is-valid");
        userAgeInput.classList.remove("is-invalid");
        ageAlert.classList.add("d-none");

    }
}




// start password rejex


userPasswordInput.onkeyup = function () {
    var passRejex = /^.{7,}[a-z]{1}$/;
    if (!passRejex.test(userPasswordInput.value)) {
        submitBtn.disabled = "true";
        userPasswordInput.classList.add("is-invalid");
        userPasswordInput.classList.remove("is-valid");
        passAlert.classList.remove("d-none");


    } else {
        submitBtn.removeAttribute("disabled");
        userPasswordInput.classList.add("is-valid");
        userPasswordInput.classList.remove("is-invalid");
        passAlert.classList.add("d-none");

    }
}

// end pass rejex



// repassword validation
userRepassInput.onkeyup = function () {

    if (userRepassInput.value === userPasswordInput.value) {
        submitBtn.disabled = "true";
        userRepassInput.classList.add("is-valid");
        userRepassInput.classList.remove("is-invalid");
        console.log(`hi`)
    }
    else {
        submitBtn.removeAttribute("disabled");
        userRepassInput.classList.add("is-invalid");
        userRepassInput.classList.remove("is-valid");
    }

}


    // var passRejex = /^.{1,7}[a-z]{1}$/;
    // if (!passRejex.test(userPasswordInput.value))
    //  {
    //     submitBtn.disabled="true";
    //     userPasswordInput.classList.add("is-invalid");   
    //     userPasswordInput.classList.remove("is-valid"); 
    //     passAlert.classList.remove("d-none");


    // } else {
    //     submitBtn.removeAttribute("disabled");
    //    userPasswordInput.classList.add("is-valid");   
    //     userPasswordInput.classList.remove("is-invalid"); 
    //     passAlert.classList.add("d-none");
