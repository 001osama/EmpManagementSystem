
namespace EmpManagement.Methods
{
	public class ResponseModel
	{
		public bool isSuccess { get; set; }
		public object result { get; set; }
		public string message { get; set; }
		public int statusCode { get; set; }
	}
	public static class ResponseHelper
	{
		public static ResponseModel GetSuccessResponse(object obj, string message = "Success")
		{
			return new ResponseModel()
			{
				isSuccess = true,
				result = obj,
				message = message,
				statusCode = 200,
			};
		}
		public static ResponseModel GetFailureResponse(object obj, string message = "Error")
		{
			return new ResponseModel()
			{
				isSuccess = false,
				result = obj,
				message = message,
				statusCode = 400,
			};
		}
	}
}
