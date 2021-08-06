<?php


namespace My\Form\Controller\Adminhtml\SampleForm;

use Magento\Backend\App\Action\Context;
use Magento\Framework\App\Request\DataPersistorInterface;
use Magento\Framework\Exception\LocalizedException;
use Magento\TestFramework\Inspection\Exception;
use My\Form\Model\Form\ImageUploader;

class Save extends \Magento\Backend\App\Action
{
    /**
     * @var DataPersistorInterface
     */
    protected $dataPersistor;

    /**
     * @var ImageUploader
     */
    protected $imageUploader;

    /**
     * @param Context $context
     * @param DataPersistorInterface $dataPersistor
     * @param ImageUploader $imageUploader
     */
    public function __construct(
        Context $context,
        DataPersistorInterface $dataPersistor,
        ImageUploader $imageUploader
    ) {
        $this->dataPersistor = $dataPersistor;
        $this->imageUploader = $imageUploader;
        parent::__construct($context);
    }

    /**
     * Save action
     *
     * @SuppressWarnings(PHPMD.CyclomaticComplexity)
     * @return \Magento\Framework\Controller\ResultInterface
     */
    public function execute()
    {
        /** @var \Magento\Backend\Model\View\Result\Redirect $resultRedirect */
        $resultRedirect = $this->resultRedirectFactory->create();
        $data = $this->getRequest()->getPostValue();

        $writer = new \Zend\Log\Writer\Stream(BP . '/var/log/test.log');

        $logger = new \Zend\Log\Logger();

        $logger->addWriter($writer);

        $logger->info($data);

        if($data)
        {
            $name=$data['sample_fieldset']['name'];
            $age=$data['sample_fieldset']['age'];
            $image=$data['sample_fieldset']['image'][0]['file'];
            $logger->info($age);
            $logger->info($image);
        
            $data1=[];
            $data1['name']=$name;
            $data1['age']=$age;
            $data1['image']=$image;



         
             
             /** @var \My\Form\Model\Customer $model */
             $model = $this->_objectManager->create('My\Form\Model\Customer');
             $model->setData($data1);
             $model->save();

            

             $this->dataPersistor->set('banners_slider', $data);
             return $resultRedirect->setPath('form/form/index', ['id' => $this->getRequest()->getParam('id')]);
         }
    }

}
