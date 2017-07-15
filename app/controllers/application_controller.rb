class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def resource_name
    controller_name.singularize
  end

  def resource_class
    resource_name.camelcase.constantize
  end

  private
    def permitted_params
      params.require(resource_name).permit(resource_class.permitted_params)
    end
end
