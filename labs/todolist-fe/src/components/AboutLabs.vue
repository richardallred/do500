<template>
  <div>
    <h3>Learn more about Open Innovation Labs</h3>
    <ul>
      <li v-for="item in aboutLabs" :key="item.name" ><a :href="item.url" target="_blank">{{item.name}}</a></li>
    </ul>
    <h3>Connect with us</h3>
    <ul>
      <li v-for="item in social" :key="item.name" ><a :href="item.url" target="_blank">{{item.name}}</a></li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "AboutLabs",
  components: {},
  data() {
    return {
      aboutLabs: [
        {
          name: "Labs Homepage",
          url:
            "https://www.redhat.com/en/engage/open-innovation-labs-20170905?sc_cid=701f2000000tvPOAAY"
        },
        {
          name: "Lab Locations",
          url:
            "https://www.redhat.com/en/services/consulting/open-innovation-labs/locations"
        },
        {
          name: "Labs Tech",
          url: "https://www.redhat.com/en/explore/my-open-innovation-lab-stack"
        },
        {
          name: "Inside a Residency Blog",
          url:
            "https://developers.redhat.com/blog/2018/01/26/part-1-inside-open-innovation-labs-residency/"
        }
      ],
      social: [
        {
          name: "YouTube",
          url: "https://www.youtube.com/watch?v=RxOKoqpDuIA"
        },
        {
          name: "Twitter",
          url: "https://twitter.com/redhatlabs?lang=en"
        }
      ]
    };
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #a30000;
}
</style>
