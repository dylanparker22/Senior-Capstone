using Microsoft.AspNetCore.Mvc;

namespace Senior_Capstone.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DylanController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Hello, this is Dylan");
        }
    }
}
