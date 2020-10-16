let timer;
let deleteFirstImageDelay;

async function fetchData()
{
    try
    {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();

        const {message} = data;

        createBreedList(message);
    } 
    catch (e) 
    {
        console.log("Error fetching dog API");
    }
}

fetchData();

function createBreedList(breedList)
{
    document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
            <option>Choose a dog breed</option>
            ${Object.keys(breedList).map(breed => `<option>${breed}</option>`).join('')}
    </select>
    `
}

async function loadByBreed(breed)
{
    if(breed != "Choose a dog breed")
    {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        const data = await response.json();

        const {message} = data;

        createSlideShow(message);
    }
}

function createSlideShow(images)
{
    let currentImagePosition = 0;
    clearInterval(timer);
    clearTimeout(deleteFirstImageDelay);

    if(images.length > 1)
    {
        document.getElementById("slideshow").innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide" style="background-image: url('${images[1]}')"></div>
        `

        currentImagePosition += 2;

        if(images.length == 2) currentImagePosition = 0;

        timer = setInterval(nextImageSlide, 2000);
    }
    else
    {
        document.getElementById("slideshow").innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide"></div>
        `
    }

    function nextImageSlide()
    {
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentImagePosition]}')"></div>`)
        deleteFirstImageDelay = setTimeout(() =>
            {
                document.querySelector(".slide").remove();
            }, 1000)
        
        if(currentImagePosition + 1 >= images.length)
        {
            currentImagePosition = 0;
        }
        else
        {
            currentImagePosition++;
        }
    }
}