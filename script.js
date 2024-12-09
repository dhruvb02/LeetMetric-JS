document.addEventListener("DOMContentLoaded", function(){


    const searchButton = document.getElementById("search-button");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");

    function validateUsername(username){
        if(username.trim()===""){
            alert("Username is empty");
            return false;
        }
        const regex=/^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("invalid username");
        }
        return isMatching;

    }

    async function fetchUserDetails(username){
        const url= `https://leetcode-stats-api.herokuapp.com/${username}`;
        try{
            searchButton.textContent= "seraching...";
            searchButton.disabled=true;
            
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch user details")
            }


            const data = await response.json();
            console.log("data", data);

            if (data && data.status!='error') {
                displayUserData(data); // Pass the data object to the display function
            } else {
                throw new Error("Invalid data structure returned from API");
            }

        }
        catch(error){
            console.error("Error fetching user details", error.message);
            statsContainer.innerHTML= "<p>No data found</p>"
        }
        finally{
            searchButton.textContent= "Search";
            searchButton.disabled=false;
        }

        displayUserData();

    }

    function updateProgress(solved,total,label,circle){
        const progressDegree=(solved/total)*100;
        circle.style.setProperty("--progress-degree",`${progressDegree}%`);
        label.textContent=`${solved}/${total}`;
    }


    function displayUserData(data){
       // Check if data is valid
        if (!data) {
            console.error("Data is undefined in displayUserData");
            return;
        }

        // Extract data into variables
        const status = data.status;
        const message = data.message;
        const totalSolved = data.totalSolved;
        const totalQuestions = data.totalQuestions;
        const easySolved = data.easySolved;
        const totalEasy = data.totalEasy;
        const mediumSolved = data.mediumSolved;
        const totalMedium = data.totalMedium;
        const hardSolved = data.hardSolved;
        const totalHard = data.totalHard;
        const acceptanceRate = data.acceptanceRate;
        const ranking = data.ranking;
        const contributionPoints = data.contributionPoints;
        const reputation = data.reputation;

        updateProgress(easySolved, totalEasy,easyLabel, easyProgressCircle);
        updateProgress(mediumSolved, totalMedium,mediumLabel, mediumProgressCircle);
        updateProgress(hardSolved, totalHard,hardLabel, hardProgressCircle);


    }

    searchButton.addEventListener('click', function(){
        const username=usernameInput.value;
        console.log("username: ",username);

        if(validateUsername(username)){
            fetchUserDetails(username);
        }


    })

})


