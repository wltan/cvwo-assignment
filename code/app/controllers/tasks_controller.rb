class TasksController < ApplicationController
  def new
  end

  def create
    render plain: params[:task].inspect
  end
end
