using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq; // Add this directive
using Newtonsoft.Json;

namespace Senior_Capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EspnController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public EspnController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpGet("college-football-scoreboard")]
        public async Task<IActionResult> GetCollegeFootballScoreboard()
        {
            var url = "https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard";
            var response = await _httpClient.GetAsync(url);
    
            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Error fetching data.");
            }

            var responseBody = await response.Content.ReadAsStringAsync();
            var scoreboard = JToken.Parse(responseBody); // Keeps it flexible

            // Serialize it explicitly to avoid formatting issues
            var jsonString = JsonConvert.SerializeObject(scoreboard, Formatting.Indented);
                return Content(jsonString, "application/json");
        }
    }
}


