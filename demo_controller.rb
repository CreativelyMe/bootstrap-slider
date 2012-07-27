class DemoController < ApplicationController
  def index
    @demos = Demo.all

    respond_to do |format|
      format.html
    end
  end

  def show
    @demo = Demo.find(params[:id])

    respond_to do |format|
      format.html
      format.js { render :partial => "demo" }
    end
  end
end
