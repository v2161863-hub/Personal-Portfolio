// ======================================
// 1. ES6 VARIABLES
// ======================================

const studentName = "Lasya";

let projectCount = 0;


// ======================================
// 2. ARRAY OF OBJECTS
// ======================================

const projects = [

    {
        name: "Personal Portfolio",
        technology: "HTML, CSS, Bootstrap, JavaScript",
        category: "web",
        description:
            "A responsive personal portfolio website."
    },

    {
        name: "EcoVerse",
        technology: "Web Technologies",
        category: "web",
        description:
            "A website for environmental awareness and learning."
    },

    {
        name: "Expense Tracker",
        technology: "Python",
        category: "python",
        description:
            "A simple application for tracking expenses."
    }

];


// ======================================
// 3. ARROW FUNCTION
// ======================================

const updateProjectCount = () => {

    projectCount = projects.length;

    const projectCountElement =
        document.getElementById("projectCount");

    if (projectCountElement) {

        projectCountElement.textContent =
            `Total Projects: ${projectCount}`;

    }

};


// ======================================
// 4. DISPLAY PROJECTS
// ======================================

function displayProjects(category = "all") {

    const projectList =
        document.getElementById("projectContainer");


    if (!projectList) {

        console.error(
            "projectContainer was not found in index.html"
        );

        return;

    }


    // Clear previous projects

    projectList.innerHTML = "";


    // Filter projects

    const filteredProjects =
        projects.filter(project => {

            if (category === "all") {

                return true;

            }

            return project.category === category;

        });


    // Loop through projects

    filteredProjects.forEach(project => {

        const projectHTML = `

            <div class="col-md-6 col-lg-4 mb-4">

                <div class="card project-card h-100">

                    <div class="card-body">

                        <h3 class="card-title">
                            ${project.name}
                        </h3>

                        <p>
                            ${project.description}
                        </p>

                        <p>

                            <strong>
                                Technology:
                            </strong>

                            ${project.technology}

                        </p>

                        <span class="badge bg-primary">

                            ${
                                project.category === "python"
                                    ? "Python"
                                    : "Web"
                            }

                        </span>

                    </div>

                </div>

            </div>

        `;


        projectList.insertAdjacentHTML(
            "beforeend",
            projectHTML
        );

    });

}


// ======================================
// 5. PROJECT FILTERING
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const filterButtons =
            document.querySelectorAll(".filter-btn");


        filterButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const category =
                        button.getAttribute(
                            "data-category"
                        );


                    displayProjects(category);


                    // Update button appearance

                    filterButtons.forEach(btn => {

                        btn.classList.remove(
                            "btn-primary"
                        );

                        btn.classList.add(
                            "btn-outline-primary"
                        );

                    });


                    button.classList.remove(
                        "btn-outline-primary"
                    );

                    button.classList.add(
                        "btn-primary"
                    );

                }
            );

        });


        // Display all projects when page loads

        displayProjects("all");

    }
);


// ======================================
// 6. DARK / LIGHT THEME
// ======================================

const themeButton =
    document.getElementById("themeButton");


if (themeButton) {

    themeButton.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark-mode"
            );


            if (
                document.body.classList.contains(
                    "dark-mode"
                )
            ) {

                themeButton.textContent =
                    "Change to Light Mode";

            } else {

                themeButton.textContent =
                    "Change to Dark Mode";

            }

        }
    );

}


// ======================================
// 7. FORM VALIDATION
// ======================================

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        (event) => {

            // Prevent page reload

            event.preventDefault();


            // Get values

            const name =
                document.getElementById(
                    "name"
                ).value.trim();

            const email =
                document.getElementById(
                    "email"
                ).value.trim();

            const message =
                document.getElementById(
                    "message"
                ).value.trim();


            // Error elements

            const nameError =
                document.getElementById(
                    "nameError"
                );

            const emailError =
                document.getElementById(
                    "emailError"
                );

            const messageError =
                document.getElementById(
                    "messageError"
                );

            const successMessage =
                document.getElementById(
                    "successMessage"
                );


            // Clear old messages

            nameError.textContent = "";

            emailError.textContent = "";

            messageError.textContent = "";

            successMessage.classList.add(
                "d-none"
            );

            successMessage.textContent = "";


            let isValid = true;


            // ==================================
            // NAME VALIDATION
            // ==================================

            if (name === "") {

                nameError.textContent =
                    "Please enter your name.";

                isValid = false;

            } else if (name.length < 3) {

                nameError.textContent =
                    "Name must contain at least 3 characters.";

                isValid = false;

            }


            // ==================================
            // EMAIL VALIDATION
            // ==================================

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (email === "") {

                emailError.textContent =
                    "Please enter your email.";

                isValid = false;

            } else if (
                !emailPattern.test(email)
            ) {

                emailError.textContent =
                    "Please enter a valid email address.";

                isValid = false;

            }


            // ==================================
            // MESSAGE VALIDATION
            // ==================================

            if (message === "") {

                messageError.textContent =
                    "Please enter a message.";

                isValid = false;

            } else if (message.length < 10) {

                messageError.textContent =
                    "Message must contain at least 10 characters.";

                isValid = false;

            }


            // ==================================
            // SUCCESS
            // ==================================

            if (isValid) {

                successMessage.textContent =
                    `Thank you, ${studentName}! Your message has been submitted successfully.`;

                successMessage.classList.remove(
                    "d-none"
                );

                contactForm.reset();

            }

        }
    );

}


// ======================================
// 8. INITIAL DISPLAY
// ======================================

updateProjectCount();


// ======================================
// PROFILE IMAGE UPLOAD
// ======================================

const profileUpload =
    document.getElementById("profileUpload");

const profileImage =
    document.getElementById("profileImage");

const saveProfilePicture =
    document.getElementById("saveProfilePicture");

const changeProfilePicture =
    document.getElementById("changeProfilePicture");

const profilePictureStatus =
    document.getElementById("profilePictureStatus");

const savedProfilePictureKey =
    "portfolioProfilePicture";


if (
    profileUpload
    && profileImage
    && saveProfilePicture
    && changeProfilePicture
    && profilePictureStatus
) {

    let pendingProfilePicture = null;

    try {

        const savedProfilePicture =
            localStorage.getItem(savedProfilePictureKey);


        if (savedProfilePicture) {

            profileImage.src = savedProfilePicture;
            changeProfilePicture.classList.remove("d-none");

        }

    } catch (error) {

        profilePictureStatus.textContent =
            "Your saved profile picture could not be loaded.";
        profilePictureStatus.classList.add("text-danger");

    }


    profileUpload.addEventListener(
        "change",
        function (event) {

            const file =
                event.target.files[0];

            profileUpload.value = "";


            if (file) {

                if (!file.type.startsWith("image/")) {

                    profilePictureStatus.textContent =
                        "Please choose an image file.";
                    profilePictureStatus.classList.add("text-danger");
                    return;

                }

                const reader =
                    new FileReader();


                reader.onload =
                    function (e) {

                        if (typeof e.target.result !== "string") {

                            profilePictureStatus.textContent =
                                "The selected image could not be read.";
                            profilePictureStatus.classList.add("text-danger");
                            return;

                        }

                        pendingProfilePicture = e.target.result;
                        profileImage.src = pendingProfilePicture;
                        saveProfilePicture.disabled = false;
                        changeProfilePicture.classList.remove("d-none");
                        profilePictureStatus.textContent =
                            "Preview updated. Select Save to keep this picture.";
                        profilePictureStatus.classList.remove("text-danger");

                    };

                reader.onerror =
                    function () {

                        profilePictureStatus.textContent =
                            "The selected image could not be read.";
                        profilePictureStatus.classList.add("text-danger");

                    };


                reader.readAsDataURL(file);

            }

        }
    );
    saveProfilePicture.addEventListener(
        "click",
        function () {

            if (!pendingProfilePicture) {
                return;
            }

            try {

                localStorage.setItem(
                    savedProfilePictureKey,
                    pendingProfilePicture
                );

                pendingProfilePicture = null;
                saveProfilePicture.disabled = true;
                profilePictureStatus.textContent =
                    "Profile picture saved.";
                profilePictureStatus.classList.remove("text-danger");

            } catch (error) {

                profilePictureStatus.textContent =
                    "The profile picture could not be saved. Try a smaller image.";
                profilePictureStatus.classList.add("text-danger");

            }

        }
    );

    changeProfilePicture.addEventListener(
        "click",
        function () {

            profileUpload.click();

        }
    );

}