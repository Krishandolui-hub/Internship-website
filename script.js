
// =====================================
// 1. INTERNSHIP DATA
// =====================================

const internships = [
    {
        id: 1,
        title: "Frontend Developer Intern",
        company: "Google",
        location: "Bangalore",
        type: "Full-time",
        stipend: "₹25,000/month",
        icon: "G",
        apply: "https://careers.google.com/"
    },
    {
        id: 2,
        title: "UI/UX Design Intern",
        company: "Microsoft",
        location: "Remote",
        type: "Part-time",
        stipend: "₹15,000/month",
        icon: "M",
        apply: "https://careers.microsoft.com/"
    },
    {
        id: 3,
        title: "Web Developer Intern",
        company: "Amazon",
        location: "Mumbai",
        type: "Full-time",
        stipend: "₹20,000/month",
        icon: "A",
        apply: "https://www.amazon.jobs/"
    },
    {
        id: 4,
        title: "Data Analyst Intern",
        company: "Infosys",
        location: "Delhi",
        type: "Full-time",
        stipend: "₹18,000/month",
        icon: "I",
        apply: "https://www.infosys.com/careers/"
    },
    {
        id: 5,
        title: "Java Developer Intern",
        company: "TCS",
        location: "Bangalore",
        type: "Part-time",
        stipend: "₹12,000/month",
        icon: "T",
        apply: "https://www.tcs.com/careers"
    },
    {
        id: 6,
        title: "Digital Marketing Intern",
        company: "Adobe",
        location: "Remote",
        type: "Full-time",
        stipend: "₹16,000/month",
        icon: "A",
        apply: "https://careers.adobe.com/"
    }
];


// =====================================
// 2. SELECT HTML ELEMENTS
// =====================================

const jobGrid = document.getElementById("jobGrid");
const savedGrid = document.getElementById("savedGrid");

const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const typeFilter = document.getElementById("typeFilter");

const searchBtn = document.getElementById("searchBtn");

const resultCount = document.getElementById("resultCount");
const emptyMessage = document.getElementById("emptyMessage");
const savedEmpty = document.getElementById("savedEmpty");


// =====================================
// 3. LOAD SAVED JOBS
// =====================================

let savedJobs = [];

try {
    const storedJobs = JSON.parse(
        localStorage.getItem("savedJobs") || "[]"
    );

    if (Array.isArray(storedJobs)) {
        savedJobs = storedJobs.filter(
            id => internships.some(job => job.id === id)
        );
    }
} catch (error) {
    savedJobs = [];
}


// =====================================
// 4. CREATE INTERNSHIP CARD
// =====================================

function createJobCard(job) {

    const isSaved = savedJobs.includes(job.id);

    return `
        <article class="job-card">

            <div class="card-top">

                <div class="company-logo" aria-hidden="true">
                    ${job.icon}
                </div>

                <button
                    class="save-btn ${isSaved ? "saved" : ""}"
                    data-save="${job.id}"
                    aria-pressed="${isSaved}"
                    aria-label="${isSaved ? "Remove saved" : "Save"} ${job.title}"
                >
                    ${isSaved ? "♥ Saved" : "♡ Save"}
                </button>

            </div>

            <h3>${job.title}</h3>

            <p class="company">${job.company}</p>

            <div class="tags">
                <span class="tag">${job.location}</span>
                <span class="tag">${job.type}</span>
            </div>

            <div class="job-info">
                <span>${job.stipend}</span>
                <span>Internship</span>
            </div>

            <a
                class="apply-btn"
                href="${job.apply}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit ${job.company} careers website"
            >
                Apply Now →
            </a>

        </article>
    `;
}


// =====================================
// 5. DISPLAY INTERNSHIPS
// =====================================

function renderJobs(jobs) {

    jobGrid.innerHTML = jobs.map(createJobCard).join("");

    resultCount.textContent =
        `${jobs.length} internship${jobs.length === 1 ? "" : "s"} found`;

    emptyMessage.hidden = jobs.length !== 0;
}


// =====================================
// 6. DISPLAY SAVED INTERNSHIPS
// =====================================

function renderSavedJobs() {

    const saved = internships.filter(job =>
        savedJobs.includes(job.id)
    );

    savedGrid.innerHTML = saved.map(createJobCard).join("");

    savedEmpty.hidden = saved.length !== 0;
}


// =====================================
// 7. SEARCH AND FILTER FUNCTION
// =====================================

function filterJobs() {

    const search = searchInput.value.toLowerCase().trim();

    const location = locationFilter.value;

    const type = typeFilter.value;

    const filteredJobs = internships.filter(job => {

        const matchesSearch =
            job.title.toLowerCase().includes(search) ||
            job.company.toLowerCase().includes(search) ||
            job.location.toLowerCase().includes(search);

        const matchesLocation =
            location === "" || job.location === location;

        const matchesType =
            type === "" || job.type === type;

        return matchesSearch && matchesLocation && matchesType;

    });

    renderJobs(filteredJobs);
}


// =====================================
// 8. SAVE AND REMOVE INTERNSHIPS
// =====================================

function toggleSavedJob(id) {

    if (savedJobs.includes(id)) {

        savedJobs = savedJobs.filter(
            jobId => jobId !== id
        );

    } else {

        savedJobs.push(id);

    }

    localStorage.setItem(
        "savedJobs",
        JSON.stringify(savedJobs)
    );

    // Update both sections
    filterJobs();

    renderSavedJobs();
}


// =====================================
// 9. EVENT LISTENERS
// =====================================

// Search button
searchBtn.addEventListener("click", filterJobs);

// Live search
searchInput.addEventListener("input", filterJobs);

// Location filter
locationFilter.addEventListener("change", filterJobs);

// Internship type filter
typeFilter.addEventListener("change", filterJobs);


// Handle save buttons in both sections
document.addEventListener("click", function(event) {

    const button = event.target.closest("[data-save]");

    if (!button) return;

    const id = Number(button.dataset.save);

    toggleSavedJob(id);

});


// =====================================
// 10. INITIAL WEBSITE DISPLAY
// =====================================

renderJobs(internships);

renderSavedJobs();
