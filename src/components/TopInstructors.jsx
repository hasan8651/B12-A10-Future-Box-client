
const TopInstructors= () =>{

const INSTRUCTORS = [
  {
    id: 1,
    name: "Alex Carter",
    specialty: "Full‑Stack Development",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=Alex",
    rating: 4.9,
    students: 28000,
    courses: 12,
  },
  {
    id: 2,
    name: "Maya Singh",
    specialty: "UI/UX Design",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=Maya",
    rating: 4.8,
    students: 19000,
    courses: 9,
  },
  {
    id: 3,
    name: "Diego Ramirez",
    specialty: "Data Science",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=Diego",
    rating: 4.9,
    students: 23000,
    courses: 11,
  },
  {
    id: 4,
    name: "Sara Kim",
    specialty: "Cloud & DevOps",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=Sara",
    rating: 4.7,
    students: 16000,
    courses: 8,
  },
  {
    id: 5,
    name: "Noah Brown",
    specialty: "Cybersecurity",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=Noah",
    rating: 4.8,
    students: 17500,
    courses: 7,
  },
  {
    id: 6,
    name: "Lina Zhao",
    specialty: "Mobile Development",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=Lina",
    rating: 4.8,
    students: 15000,
    courses: 6,
  },
];

function Stars({ value = 5 }) {
  const filled = Math.round(value);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`w-4 h-4 ${i <= filled ? "text-yellow-400" : "text-base-content/20"}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}


  return (
    <section className="py-14 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl py-4 bg-primary font-semibold text-center ">Top Instructors  </h1>
          
          <p className="mt-3 text-base-content/70 max-w-5xl mx-auto">
            Meet the mentors behind our most popular courses.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INSTRUCTORS.map((ins) => (
            <div key={ins.id} className="card bg-base-100 shadow hover:shadow-lg transition-shadow">
              <div data-aos="zoom-in" className="card-body">
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-14 rounded-full ring ring-primary/30 ring-offset-2 ring-offset-base-100">
                      <img src={ins.avatar} alt={`Avatar of ${ins.name}`} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-base-content">{ins.name}</h3>
                    <p className="text-sm text-base-content/70">{ins.specialty}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Stars value={ins.rating} />
                      <span className="text-sm text-base-content/60">{ins.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 text-center">
                  <div>
                    <div className="text-base-content font-semibold">{ins.courses}</div>
                    <div className="text-xs text-base-content/60">Courses</div>
                  </div>
                  <div className="border-l border-base-200">
                    <div className="text-base-content font-semibold">
                      {(ins.students / 1000).toFixed(1)}k
                    </div>
                    <div className="text-xs text-base-content/60">Students</div>
                  </div>
                  <div className="border-l border-base-200">
                    <div className="text-base-content font-semibold">Top</div>
                    <div className="text-xs text-base-content/60">Rated</div>
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-sm btn-outline">View Courses</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default TopInstructors;