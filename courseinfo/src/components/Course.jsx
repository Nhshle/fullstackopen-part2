const Parts = ({ courses }) => {
  return (
    <div>
      <h1>Web Development Curriculum</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          <ol>
            {course.parts.map((part) => (
              <li key={part.id}>
                <strong>
                  {part.name} {part.exercises}
                </strong>
              </li>
            ))}
          </ol>
          <h3>
            Total of exercises:{" "}
            {course.parts.reduce((s, p) => s + p.exercises, 0)}
          </h3>
        </div>
      ))}
    </div>
  );
};

const Course = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using courses to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <Parts courses={courses} />
    </div>
  );
};

export default Course;
