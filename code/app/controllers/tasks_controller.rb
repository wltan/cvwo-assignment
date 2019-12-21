class TasksController < ApplicationController
  def index
  end

  def show
    @task = Task.find(params[:id])
  end

  def new
  end

  def edit
  end

  def create
    @task = Task.new(task_params)
    @task.save
    redirect_to @task
  end

  def update
  end

  def destroy
  end

private
  def task_params
    params.require(:task).permit(:title, :description, :due_date, :tags)
  end

end
