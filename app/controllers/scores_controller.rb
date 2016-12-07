class ScoresController < ApplicationController
  def index
    @scores = Score.order(high_score: :asc).limit(5)
    respond_to do |format|
      format.html { }
      format.json { render json: @scores }
    end
  end

  def create
    @score = Score.new(score_params)
    respond_to do |format|
      if @score.save!
        format.html { }
        format.json { render json: @score, status: :created }
      else
        flash.now[:error] = "score could not be created"
        puts @score.errors.messages
        format.html { }
        format.json { render nothing: true, status: 400 }
      end
    end
  end

  private
  def score_params
    params.require(:score).permit(:name, :high_score)
  end
end
