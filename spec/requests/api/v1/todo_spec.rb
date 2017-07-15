require 'rails_helper'

describe "Todo" do
  describe "request for index" do
    it 'should return all todos' do
      todos = Todo.create!(title: 'todo ', completed: false)
      get api_v1_todos_path
      expect(json).to eq([todos.as_json(only: [:id, :title, :completed])])
    end
  end

  describe "request for create" do
    context 'with valida data' do
      it 'should be able to create todo' do
        todo = { todo: { title: 'new todo', completed: true } }
        post api_v1_todos_path, params: todo
        expect(json["messages"]).to eq('created successful !')
      end
    end

    context 'with invalid data' do
      it 'should not be able to create todo' do
        todo = { todo: { title: nil, completed: true } }
        post api_v1_todos_path, params: todo
        expect(json["messages"]).to eq({"title"=>["can't be blank"]})
      end
    end
  end

  describe "request for update" do
    context 'with valid data' do
      it 'should be able to update todo' do
        todo = Todo.create!(title: 'Todo', completed: false)
        data_to_update = {todo: {completed: true} }

        put api_v1_todo_path(todo), params: data_to_update
        expect(json["todo"]["completed"]).to eq(data_to_update[:todo][:completed])
      end
    end

    context 'with invalid data' do
      it 'should not beable to update' do
        todo = Todo.create!(title: 'todo', completed: false)
        data_to_update = {todo: { title: nil}}

        put api_v1_todo_path(todo), params: data_to_update
        expect(response_code).to eq('200')
        expect(json["messages"]["title"]).to eq(["can't be blank"])
      end
    end
  end

  describe "request for destroy" do
    context 'without error' do
      it 'should be able to destroy' do
        todo = Todo.create!(title: 'todo1', completed: true)
        delete api_v1_todo_path(todo.id)
        expect(json["messages"]).to eq('deleted successful !')
      end
    end

    context 'with error' do
      it 'should not able to destroy' do
        todo = Todo.create!(title: 'todo1', completed: true)
        delete api_v1_todo_path(todo.id + 1)
        expect(json["messages"]).to eq('deleted not successful !')
      end
    end
  end
end
