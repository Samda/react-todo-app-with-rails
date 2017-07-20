class Api::V1::TodosController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    todos = Todo.all
    render json: { todos: todos.as_json(only: [:id, :title, :completed]) }
  end

  def create
    todo = Todo.new(permitted_params)
    if todo.save
      render json: { todo: todo.as_json(only: [:id, :title, :completed]), messages: 'created successful !'}
    else
      render json: { messages: todo.errors.messages }
    end
  end

  def update
    todo = Todo.find(params[:id])
    if todo.update(permitted_params)
      render json: { todo: todo.as_json(only: [:id, :title, :completed]), messages: 'update successful !'}
    else
      render json: { todo: todo.as_json(only: [:id, :title, :completed]), messages: todo.errors.messages }
    end
  end

  def destroy
    todo = Todo.find(params[:id])
    todo.destroy
    render json: { messages: 'deleted successful !'}
  rescue ActiveRecord::RecordNotFound
    render json: { messages: 'deleted not successful !'}
  end
end
