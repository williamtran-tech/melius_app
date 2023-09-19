const CreatePostDTO = {
    topicId: (value: any) => !isNaN(Number(value)), // Check if it's a valid number
    content: (value: any) => typeof value === 'string', // Check if it's a string
    isAnonymous: (value: boolean) => typeof Boolean(Number(value)), // Check if it's 'true' or 'false'
  };

export default CreatePostDTO;