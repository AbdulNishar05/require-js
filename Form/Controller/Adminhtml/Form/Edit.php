<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
declare(strict_types=1);

namespace My\Form\Controller\Adminhtml\Form;

use Magento\Backend\App\Action;
use Magento\Framework\App\ResponseInterface;
use Magento\Framework\View\Result\PageFactory;
use My\Form\Model\Customer;

/**
 * Class EditAction
 * @package My\Form\Controller\Adminhtml\Customer
 */
class EditAction extends Action
{
    /**
     * @var PageFactory
     */
    protected $pageFactory;
    /**
     * @var Customer
     */
    protected $customer;
    /**
     * @param Action\Context $context
     * @param PageFactory $pageFactory
     * @param Customer $customer
     */
    public function __construct(Action\Context $context, PageFactory $pageFactory, Customer $customer)
    {
        $this->customer = $customer;
        $this->pageFactory = $pageFactory;
        parent::__construct($context);
    }
   
    public function execute()
    {
        $id = $this->getRequest()->getParam("id");
        if ($id) {
            $model = $this->customer;
            $model->load($id);
            if (!$model->getId()) {
                $this->messageManager->addErrorMessage(__("This Member does not exist"));
                $result = $this->resultRedirectFactory->create();
                return $result->setPath('form/form/index');
            }
        }
        $result = $this->pageFactory->create();
        $result->getConfig()->getTitle()->set('Customer Form');
        return $result;
    }

}
