$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');
        let target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top,
            }, 500, 'linear');
        }
    });

    // contact form submission handling
    $("#contact-form").submit(function (event) {
        event.preventDefault();
        alert("Thank you! Your message has been received. Muhammad Maaz will respond within 24 hours.");
        document.getElementById("contact-form").reset();
    });

});

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Muhammad Maaz | Full-Stack Software Engineer & Systems Architect";
        $("#favicon").attr("href", "assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "assets/images/favhand.png");
    }
});

// typed js effect
if (document.querySelector(".typing-text")) {
    var typed = new Typed(".typing-text", {
        strings: [
            "High-Scale Web Platforms",
            "Real-Time Distributed Systems",
            "Next.js & React Architectures",
            "Node.js & Nest.js Microservices",
            "Cross-Platform Mobile Apps (Flutter & Kotlin)"
        ],
        loop: true,
        typeSpeed: 45,
        backSpeed: 25,
        backDelay: 1200,
    });
}

// vanilla tilt for interactive cards
if (typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
}

async function fetchData(type = "skills") {
    try {
        let response = type === "skills" ? await fetch("skills.json") : await fetch("./projects/projects.json");
        if (!response.ok) return null;
        return await response.json();
    } catch (e) {
        console.warn("Local fetch bypassed, using inline HTML fallback:", e);
        return null;
    }
}

function showSkills(skills) {
    if (!skills || !skills.length) return;
    let skillsContainer = document.getElementById("skillsContainer");
    if (!skillsContainer) return;
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
          <div class="info">
            <img src="${skill.icon}" alt="${skill.name}" />
            <span>${skill.name}</span>
          </div>
        </div>`;
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    if (!projects || !projects.length) return;
    let projectsContainer = document.querySelector("#work .box-container");
    if (!projectsContainer) return;
    let projectHTML = "";
    projects.slice(0, 6).forEach(project => {
        projectHTML += `
        <div class="box tilt">
          <img draggable="false" src="./assets/images/projects/${project.image}.png" alt="${project.name}" onerror="this.onerror=null;this.src='./assets/images/projects/portfolio1.PNG';" />
          <div class="content">
            <div class="tag">
              <h3>${project.name}</h3>
            </div>
            <div class="desc">
              <p>${project.desc}</p>
              <div class="btns">
                <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
              </div>
            </div>
          </div>
        </div>`;
    });
    projectsContainer.innerHTML = projectHTML;

    if (typeof VanillaTilt !== "undefined") {
        VanillaTilt.init(document.querySelectorAll(".tilt"), {
            max: 15,
        });
    }
}

// Load dynamic data safely with fallback preserved
fetchData("skills").then(data => {
    if (data) showSkills(data);
});

fetchData("projects").then(data => {
    if (data) showProjects(data);
});