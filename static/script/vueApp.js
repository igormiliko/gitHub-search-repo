import { Octokit} from "https://cdn.skypack.dev/octokit";

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({ auth: `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` });


// Starting the vue instance and assigning it to a constant to use in async/await() functions 
const vm = new Vue ({
  el: "#app",
  data () {
    return {
      // Data Searching
      repo: '',
      html_url: '',
      repoSize: '',
      language: '',
      forks_count: '',
      login: '',
      avatar_url: '',
      countSearch: 0,

      // Front end Datas
      initPageToRender: false,
      showResult: false,
      showSnackBar: false,
      changeIcon: false,
      viewApp: 'display: none'
    }
  },
  mounted () {
      setTimeout(() => {
        this.initPageToRender = true
      }, 2000);
    },
  methods: {
    onSubmit: async () => {
      
      // Await to get the data from the GitHub REST API
      let dataSearch = await octokit.request('GET /search/repositories', {
        q: encodeURIComponent(vm.repo)
      })
      
      // Assigning the total count of the search to aplly in the conditional
      vm.countSearch = dataSearch.data.total_count

      // to debug
      //console.log(dataSearch)

      //Conditional to shiow the result
      if (vm.countSearch != 0) {
        
        // Assigning the first result to the Data Searching in the seacrh methods of the Git Hub REST API
        vm.repo = dataSearch.data.items[0].full_name 
        vm.html_url = dataSearch.data.items[0].html_url
        vm.repoSize = dataSearch.data.items[0].size  
        vm.language = dataSearch.data.items[0].language  
        vm.forks_count = dataSearch.data.items[0].forks_count
        vm.login = dataSearch.data.items[0].owner.login
        vm.avatar_url = dataSearch.data.items[0].owner.avatar_url
        
        vm.showResult = true
        
      } else {
        vm.showSnackBar = true
        vm.changeIcon = true
        setTimeout ( () => {
          vm.showSnackBar = false
          vm.changeIcon = false
        }, 3000)
      } 
    },
    
    // Assigning the default value to the data variables
    returnToMain () {
      this.showResult = false
      this.repo = ''
      this.html_url = ''
      this.repoSize = ''
      this.language = ''
      this.forks_count = ''
      this.login = ''
      this.avatar_url = ''
      this.countSearch = 0
    }
  },

  // I'm using the computed proprietie of the Vue to 
  // apply the Styles of Tailwind CSS when the instance 
  // is rendering

  computed: {
      resultStyle () {
        return `mb-4 p-2 border-b lg:border-gray-700 
        lg:w-1/3 lg:mx-auto`
      },
      SnackBarStyle () {
        return `mt-0 mx-auto w-64 h-8 pt-1 rounded-xl 
        shadow-xl bg-red-600 text-gray-300 text-center`
      },
      MainIconContainer () {
        return `flex flex-wrap justify-center content-center
         w-36 h-36 rounded-full mt-16 bg-gray-700 mx-auto`
      },
      PerfilContainer () {
        return `flex flex-wrap justify-center content-center
         w-36 h-36 mx-auto rounded-full mt-4 bg-gray-700`
      }
  }
})