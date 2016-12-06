class TagsController < ApplicationController

  def index
    @tags = Tag.all
    respond_to do |format|
      format.html { }
      format.json { render json: @tags }
    end
  end

  def create
    @tag = Tag.new(tag_params)
    respond_to do |format|
      if @tag.save
        format.html { }
        format.json { render json: @tag, status: :created }
      else
        flash.now[:error] = "tag could not be created"
        puts @tag.errors.messages
        format.html { }
        format.json { render nothing: true, status: 400 }
      end
    end
  end

  def destroy
    @tag = Tag.find(params[:id])
    respond_to do |format|
      if @tag.destroy!
        flash[:success] = "tag deleted!"
        format.html { }
        format.json { render json: @tag }
      else
        flash[:danger] = "Unable to delete this tag post!"
        format.html { }
        format.json { render nothing: true, status: 400 }
      end
    end
  end

  private
  def tag_params
    params.require(:tag).permit(:xCoordinate, :yCoordinate, :name)
  end
end
