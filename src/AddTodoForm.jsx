function AddTodoForm () {
    return (
        <form>
          <label htmlFor="title">Title</label>
          <input type="text" id="todoTitle" />
          <button type="submit">Add</button>
        </form>
      );
};

export default AddTodoForm;