const TeacherSelector = ({ teachers, selected, setSelected }) => {
  return (
    <div className="mb-4">
      <select
        className="form-select w-25"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="">All Teachers</option>
        {teachers.map((t) => (
          <option key={t._id.teacher_id} value={t._id.teacher_id}>
            {t._id.teacher_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TeacherSelector;