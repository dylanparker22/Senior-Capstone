using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq; // Add this directive
using Newtonsoft.Json;

namespace Senior_Capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SportsOddsController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public SportsOddsController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpGet("all-sports")]
        public async Task<IActionResult> GetSports()
        {
            var url = "https://api.the-odds-api.com/v4/sports?apiKey=dec94cb8710a2dd89387b1355152774b";
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

        [HttpGet("getSportByKey")]
        public async Task<IActionResult> getSportByKey(string key)
        {
            var url = "https://api.the-odds-api.com/v4/sports/" + key + "/odds?regions=us&oddsFormat=american&apiKey=dec94cb8710a2dd89387b1355152774b";

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