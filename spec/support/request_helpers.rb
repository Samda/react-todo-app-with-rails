module RequestHelpers
  def json
    JSON.parse(body)
  end

  def response_code
    response.code
  end
end
